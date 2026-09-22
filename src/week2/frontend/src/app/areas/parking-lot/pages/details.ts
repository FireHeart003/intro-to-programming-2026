import { Component, input, signal } from '@angular/core';
import { ParkingLotDetailItem } from '../types';
import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-parking-lot-details',
  imports: [DatePipe],
  template: `
    <div class="flex flex-row w-full  p-4 bg-base-200 align-middle ">
      <div class="flex flex-col gap-4 w-fit items-end bg-base-300 p-4 ">
        <p class="text-sm opacity-65">Title</p>
        <p class="text-sm opacity-65">Created</p>
        <p class="text-sm opacity-65">Description</p>
        <p class="text-sm opacity-65">Notes</p>
      </div>
      <div class="flex flex-col gap-4 w-fit items-start p-4 ">
        <p class="font-bold">{{ fakeItem().title }}</p>
        <p>
          {{ fakeItem().created | date: 'longDate' }} at
          {{ fakeItem().created | date: 'shortTime' }}
        </p>
        <p>{{ fakeItem().description }}</p>
        @for (note of fakeItem().notes; track note.id) {
          <div class="p-4 m-2 border border-dashed w-full ">
            <p class=" font-medium">{{ note.content }}</p>
            <p class="font-sans">
              {{ note.added | date: 'longDate' }} at {{ note.added | date: 'shortTime' }}
            </p>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class Details {
  id = input.required<string>();

  //   item = httpResource<ParkingLotDetailItem>(() => `/api/parking-lot/${this.id()}`);
  fakeItem = signal<ParkingLotDetailItem>({
    id: '99',
    title: 'Macrame',
    created: '2026-09-22T18:32:27.025Z',
    description: 'Always wanted to learn to make those hippy planters',
    notes: [
      {
        id: '1',
        content: 'These are cool',
        added: '2026-09-22T14:32:27.025Z',
      },
      {
        id: '2',
        content: 'A list of good knots https://hobbii.com/blogs/news/macrame-knots-for-beginners',
        added: '2026-09-22T14:32:27.025Z',
      },
    ],
  });
}
