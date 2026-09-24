import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ParkingLotStore } from '../stores/parking-lot';
import { DownIcon } from './down-icon';
import { UpIcon } from './up-icon';

@Component({
  selector: 'app-parking-lot-list-sort',
  imports: [UpIcon, DownIcon, TitleCasePipe],
  template: `
    <div class="join py-8">
      @for (col of store.columns; track $index) {
        <button
          (click)="store.toggle(col)"
          class="btn  join-item hover:ring-2  hover:ring-red-300"
          [class.ring-2]="store.column() === col"
          [class.ring-blue-500]="store.column() === col"
        >
          {{ col | titlecase }}
          @if (store.column() === col && store.direction() === 'Asc') {
            <app-parking-lot-up-arrow />
          } @else {
            <app-parking-lot-down-arrow />
          }
        </button>
      }
    </div>
  `,
  styles: ``,
})
export class ListSort {
  protected readonly store = inject(ParkingLotStore);
}
