import { Component, inject } from '@angular/core';
import { ParkingLotStore } from '../stores/parking-lot';
import { ListSort } from '../widgets/list-sort';

@Component({
  selector: 'app-parking-lot-list',
  imports: [ListSort],
  template: `
    @if (store.itemsResource.error()) {
      <div class="alert alert-warning">
        <p>Bummer. The api seems to be failing. Try again?</p>
      </div>
    }
    @if (store.itemsResource.isLoading() && !store.itemsResource.error()) {
      <span class="loading loading-spinner text-primary"></span>
    } @else {
      <app-parking-lot-list-sort />
      <ul class="p-4 bg-base-200">
        @for (item of store.sortedList(); track item.id) {
          <li>
            <span>{{ item.title }}</span>
          </li>
        } @empty {
          <li class="alert alert-info">Sorry - no items in your parking lot! Add some?</li>
        }
      </ul>
    }
  `,
  styles: ``,
})
export class List2 {
  protected readonly store = inject(ParkingLotStore);
}
