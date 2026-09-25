import { patchState, signalStoreFeature, type, withComputed, withMethods } from '@ngrx/signals';
import { addEntity, removeEntity, setEntities, withEntities } from '@ngrx/signals/entities';
import { Note } from '../../shared/api';
import { computed } from '@angular/core';

// "entity" (e.g. "Entity Framework", here withEntities, etc.)
// An entity is an object that is an instance of a set of objects, tracked by an id.
/*
    {
        "id": 1,
        "name": "Bob Smith",
        "salary": 42000
    },
    {
        "id": 2,
        "name": "Bob Smith",
        "salary": 42000
    }


*/

export function withNoteTracking() {
  return signalStoreFeature(
    withEntities({ entity: type<Note>(), collection: 'real' }),
    withEntities({ entity: type<Note>(), collection: 'outbox' }),

    withMethods((store) => {
      return {
        deleteNote: async (noteId: string, itemId: string) => {
          // move the note from real to outbox if it exists in real
          const noteExistsInReal = store.realEntities()?.some((n) => n.id === noteId);

          if (noteExistsInReal) {
            const n = store.realEntityMap()[noteId];
            patchState(store, removeEntity(noteId, { collection: 'real' }));

            patchState(store, addEntity(n, { collection: 'outbox' }));
            await fetch(`/api/parking-lot/${itemId}/notes/${noteId}`, {
              method: 'DELETE',
            });
            patchState(store, removeEntity(noteId, { collection: 'outbox' }));
          }
        },
        addAllNotes: (notes: Note[]) =>
          patchState(store, setEntities(notes, { collection: 'real' })),
        addNote: async (note: { content: string }, itemId: string) => {
          const newNote: Note = {
            id: crypto.randomUUID(),
            content: note.content,
            added: new Date().toISOString(),
          };
          patchState(store, addEntity(newNote, { collection: 'outbox' }));

          const response = await fetch(`/api/parking-lot/${itemId}/notes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote),
          });
          if (response.ok) {
            const addedNote = (await response.json()) as unknown as Note;
            patchState(store, addEntity(addedNote, { collection: 'real' }));
            patchState(store, removeEntity(newNote.id, { collection: 'outbox' }));
          }
        },
      };
    }),

    withComputed((store) => {
      return {
        allNotes: computed(() => {
          const allNotes = store.realEntities() || [];

          const outBoxNotes = store.outboxEntities() || [];

          const transformedAll = allNotes.map((n) => ({ ...n, temp: false }));
          const transformedOutBox = outBoxNotes.map((n) => ({ ...n, temp: true }));
          return [...transformedOutBox, ...transformedAll];
        }),
      };
    }),
  );
}
