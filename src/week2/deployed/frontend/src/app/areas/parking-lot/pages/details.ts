import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, effect, inject, input, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { ParkingLotStore } from '../stores/parking-lot';
import { ParkingLotDetailItem } from '../types';

@Component({
  selector: 'app-parking-lot-details',
  imports: [DatePipe, FormRoot, FormField],
  template: `
    <div class="flex flex-row w-full  p-4 bg-base-200 align-middle ">
      <div class="flex flex-col gap-4 w-fit items-end bg-base-300 p-4 ">
        <p class="text-sm opacity-65">Title</p>
        <p class="text-sm opacity-65">Created</p>
        <p class="text-sm opacity-65">Description</p>
        <p class="text-sm opacity-65">Notes</p>
      </div>
      <div class="flex flex-col gap-4 w-fit items-start p-4 ">
        <p data-testid="title" class="font-bold">{{ fakeItem.value()?.title }}</p>
        <p>
          {{ fakeItem.value()?.created | date: 'longDate' }} at
          {{ fakeItem.value()?.created | date: 'shortTime' }}
        </p>
        <p>{{ fakeItem.value()?.description }}</p>
        @for (note of store.allNotes(); track note.id) {
          <div class="p-4 m-2 border border-dashed w-full ">
            <p class=" font-medium">{{ note.content }}</p>
            <p class="font-sans">
              {{ note.added | date: 'longDate' }} at {{ note.added | date: 'shortTime' }}
              @if (note.temp) {
                <span class="font-bold text-red-400">Pending...</span>
              } @else {
                <button
                  (click)="remove(note.id)"
                  type="button"
                  class="btn btn-circle btn-error btn-sm"
                >
                  X
                </button>
              }
            </p>
          </div>
        }
      </div>
    </div>
    <form [formRoot]="form">
      <label class="label">
        Content of new note:
        <input class="input input-lg input-accent" [formField]="form.content" type="text" />
      </label>
      <button type="submit" class="btn btn-sm btn-primary">Add Note</button>
    </form>
  `,
  styles: ``,
})
export class Details {
  id = input.required<string>();
  store = inject(ParkingLotStore);
  fakeItem = httpResource<ParkingLotDetailItem>(() => `/api/parking-lot/${this.id()}`);

  model = signal<{ content: string }>({
    content: '',
  });
  async remove(noteId: string) {
    await this.store.deleteNote(noteId, this.id());
  }

  form = form(
    this.model,
    (tree) => {
      required(tree.content, { message: 'Need some content' });
    },
    {
      submission: {
        action: async () => {
          this.store.addNote(this.form().value(), this.id());
          this.model.update(() => ({ content: '' }));
          this.form().reset();
        },
      },
    },
  );

  // what I want is when this resource which has the stupid name of "fakeItem" has a value, I want to
  // take the notes and put them in that store.

  constructor() {
    effect(() => {
      const notes = this.fakeItem.value()?.notes || [];
      if (notes.length > 0) {
        this.store.addAllNotes(notes);
      }
    });
  }
}
