import { patchState, signalStoreFeature, type, withComputed, withMethods } from '@ngrx/signals';
import { addEntity, setEntities, withEntities } from '@ngrx/signals/entities';
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
        addAllNotes: (notes: Note[]) =>
          patchState(store, setEntities(notes, { collection: 'real' })),
        addNote: (note: { content: string }) => {
          const newNote: Note = {
            id: crypto.randomUUID(),
            content: note.content,
            added: new Date().toISOString(),
          };
          patchState(store, addEntity(newNote, { collection: 'outbox' }));
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
