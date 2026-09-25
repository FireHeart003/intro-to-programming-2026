import { Component, inject, signal } from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  maxLength,
  minLength,
  required,
  validateStandardSchema,
} from '@angular/forms/signals';
import { ParkingLotItem } from '../types';
import { ParkingLotStore } from '../stores/parking-lot';
import { zParkingLotCreateItem } from '../../shared/api/zod.gen';
export type ParkingLotItemCreate = Pick<ParkingLotItem, 'title' | 'description'>;

@Component({
  selector: 'app-parking-lot-add',
  imports: [FormField, FormRoot],
  template: `
    @if (form().submitting()) {
      <div class="alert alert-info">Saving your new Item!</div>
    } @else {
      <form [formRoot]="form">
        <div class="flex flex-col gap-4">
          <label class="label flex gap-4">
            Title
            <input type="text" placeholder="Title" class="input" [formField]="form.title" />
            @if (form.title().invalid() && (form.title().dirty() || form.title().touched())) {
              <div class="alert alert-error">
                @for (e of form.title().errorSummary(); track $index) {
                  @switch (e.kind) {
                    @case ('required') {
                      <p>That is required! {{ e.message }}</p>
                    }
                    @case ('minLength') {
                      <p>Give us at least three letters!</p>
                    }
                    @default {
                      {{ e.kind }}
                    }
                  }
                }
              </div>
            }
          </label>
          <label class="floating-label">
            <textarea
              type="text"
              placeholder="Description"
              class="input"
              [formField]="form.description"
            ></textarea>
            <span>Description</span>
          </label>

          <button type="submit" class="btn btn-primary w-1/3">Add Item To Parking Lot</button>
        </div>
      </form>
    }
  `,
  styles: ``,
})
export class Add {
  protected readonly store = inject(ParkingLotStore);

  protected readonly model = signal<ParkingLotItemCreate>({
    title: '',
    description: '',
  });

  protected readonly form = form(
    this.model,
    (tree) => {
      validateStandardSchema(tree, zParkingLotCreateItem);
      // required(tree.title, { message: 'You must give us a title' });
      // minLength(tree.title, 3);
      // maxLength(tree.title, 100);
      // maxLength(tree.description, 500, { message: 'Come on, nobody is going to read all that!' });
    },
    {
      submission: {
        action: async (field) => {
          await this.store.addParkingLotItem(field().value());
          this.model.set({
            title: '',
            description: '',
          });
          this.form().reset();
        },
      },
    },
  );
}
