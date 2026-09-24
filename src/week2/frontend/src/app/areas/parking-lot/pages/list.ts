import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParkingLotStore } from '../stores/parking-lot';
import { ListSort } from '../widgets/list-sort';

@Component({
  selector: 'app-parking-lot-list',
  imports: [DatePipe, RouterLink, ListSort],
  template: `
    @if (store.itemsResource.error()) {
      <div class="alert alert-warning">
        <p>Bummer. The api seems to be failing. Try again?</p>
      </div>
    }
    @if (store.itemsResource.isLoading() && !store.itemsResource.error()) {
      <span class="loading loading-spinner text-primary"></span>
      <span class="loading loading-spinner text-secondary"></span>
      <span class="loading loading-spinner text-accent"></span>
      <span class="loading loading-spinner text-neutral"></span>
      <span class="loading loading-spinner text-info"></span>
      <span class="loading loading-spinner text-success"></span>
      <span class="loading loading-spinner text-warning"></span>
      <span class="loading loading-spinner text-error"></span>
    } @else {
      <app-parking-lot-list-sort />

      <ul data-testid="item-list" class="p-4 bg-base-200">
        @for (item of store.sortedList(); track item.id) {
          <li class="collapse collapse-arrow bg-base-100 border border-base-300 mb-4">
            <input type="radio" name="my-accordion-2" checked="checked" />
            <div class="collapse-title font-semibold">
              <div class="flex flex-row gap-4 align-middle">
                <p>{{ item.title }}</p>
              </div>
            </div>
            <div class="collapse-content text-sm">
              <p>{{ item.description }}</p>
              <p class="text-sm text-secondary">
                <span
                  >{{ item.created | date: 'shortDate' }} at
                  {{ item.created | date: 'shortTime' }}</span
                >
                <a
                  [attr.data-testid]="'details-link-' + $index"
                  class="link flex flex-row gap-2"
                  [routerLink]="['..', 'details', item.id]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE -->
                    <path
                      fill="currentColor"
                      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3"
                    />
                  </svg>
                  Details
                </a>
              </p>
            </div>
          </li>
        } @empty {
          <li data-testid="empty-message" class="alert alert-info">
            Sorry - no items in your parking lot! Add some?
          </li>
        }
      </ul>
    }
  `,
  styles: ``,
})
export class List {
  protected readonly store = inject(ParkingLotStore);
}
