import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParkingLotItem } from '../types';

@Component({
  selector: 'app-parking-lot-list',
  imports: [DatePipe, RouterLink],
  template: `
    @if (itemsResource.error()) {
      <div class="alert alert-warning">
        <p>Bummer. The api seems to be failing. Try again?</p>
      </div>
    }
    @if (itemsResource.isLoading() && !itemsResource.error()) {
      <span class="loading loading-spinner text-primary"></span>
      <span class="loading loading-spinner text-secondary"></span>
      <span class="loading loading-spinner text-accent"></span>
      <span class="loading loading-spinner text-neutral"></span>
      <span class="loading loading-spinner text-info"></span>
      <span class="loading loading-spinner text-success"></span>
      <span class="loading loading-spinner text-warning"></span>
      <span class="loading loading-spinner text-error"></span>
    } @else {
      <ul class="p-4 bg-base-200">
        @for (item of itemsResource.value(); track item.id) {
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
                <a class="link flex flex-row gap-2" [routerLink]="['..', 'details', item.id]">
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
          <li class="alert alert-info">Sorry - no items in your parking lot! Add some?</li>
        }
      </ul>
    }
  `,
  styles: ``,
})
export class List {
  itemsResource = httpResource<ParkingLotItem[]>(() => '/api/parking-lot');
  //   items = signal<ParkingLotItem[]>([
  //     {
  //       id: '1',
  //       title: 'AWS Lambda',
  //       description: 'Heard about this in an email, what is the deal?',
  //       created: '2026-09-22T15:50:13.900Z',
  //     },
  //     {
  //       id: '2',
  //       title: 'The body without organs',
  //       description: 'Deleuze & Gatarri -still do not get it!',
  //       created: '2026-09-21T11:22:13.900Z',
  //     },
  //     {
  //       id: 'ng-reactivity',
  //       title: 'Reactivity in Angular',
  //       description: 'Signals, computed values, and why they feel different from classic state.',
  //       created: '2026-09-20T09:15:00.000Z',
  //     },
  //     {
  //       id: '4',
  //       title: 'Docker basics',
  //       description: 'Containers, images, and the difference between local and production workflows.',
  //       created: '2026-09-19T14:40:00.000Z',
  //     },
  //     {
  //       id: '5',
  //       title: 'TypeScript utility types',
  //       description: 'Picking apart Partial, Pick, Omit, Record, and mapped types.',
  //       created: '2026-09-18T11:05:00.000Z',
  //     },
  //     {
  //       id: '6',
  //       title: 'HTTP caching',
  //       description: 'When to use ETags, Cache-Control, and conditional requests.',
  //       created: '2026-09-17T08:30:00.000Z',
  //     },
  //     {
  //       id: '7',
  //       title: 'GraphQL fundamentals',
  //       description: 'Schemas, queries, mutations, and when it is better than REST.',
  //       created: '2026-09-16T16:20:00.000Z',
  //     },
  //     {
  //       id: '8',
  //       title: 'Testing with Cypress',
  //       description: 'End-to-end flows that mimic the user rather than just unit tests.',
  //       created: '2026-09-15T13:45:00.000Z',
  //     },
  //     {
  //       id: '9',
  //       title: 'Database indexes',
  //       description: 'Why indexes help performance and when they can hurt writes.',
  //       created: '2026-09-14T10:10:00.000Z',
  //     },
  //     {
  //       id: '10',
  //       title: 'Accessibility basics',
  //       description: 'Keyboard navigation, labels, focus states, and semantic HTML.',
  //       created: '2026-09-13T12:00:00.000Z',
  //     },
  //     {
  //       id: '11',
  //       title: 'Functional programming',
  //       description: 'Map, reduce, pure functions, and why immutability matters.',
  //       created: '2026-09-12T09:25:00.000Z',
  //     },
  //   ]);
}
