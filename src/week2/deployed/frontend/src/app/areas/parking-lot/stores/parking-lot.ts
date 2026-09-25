import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { ParkingLotItem } from '../types';
import { withStellarDevtools } from '@hypertheory-labs/stellar-ng-devtools';
import { httpResource } from '@angular/common/http';
import { computed } from '@angular/core';
import { ParkingLotItemCreate } from '../pages/add';
import { withNoteTracking } from './notes-feature';

type SortableColumns = Pick<ParkingLotItem, 'title' | 'created'>;

type SortColumns = keyof SortableColumns;
const columnList: SortColumns[] = ['title', 'created'] as const;
type SortDirection = 'Asc' | 'Desc';
type ParkingLotState = {
  column: SortColumns;
  direction: SortDirection;
};
export const ParkingLotStore = signalStore(
  withNoteTracking(),
  withStellarDevtools('parking-lot'),
  withProps(() => ({
    itemsResource: httpResource<ParkingLotItem[]>(() => '/api/parking-lot'),
    columns: columnList,
  })),
  withState<ParkingLotState>({
    column: 'created',
    direction: 'Desc',
  }),
  withMethods((store) => {
    return {
      addParkingLotItem: async (item: ParkingLotItemCreate) => {
        await fetch('/api/parking-lot', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(item),
        });
        store.itemsResource.reload();
      },
      toggle: (by: SortColumns) => {
        if (store.column() === by) {
          const newVal = store.direction() === 'Asc' ? 'Desc' : 'Asc';
          patchState(store, { direction: newVal });
        } else {
          patchState(store, { column: by });
        }
      },
    };
  }),
  withComputed((store) => {
    return {
      sortedList: computed(() => {
        const items = store.itemsResource.value() || [];
        const col = store.column();
        const direction = store.direction();
        // return items;
        if (col === 'title') {
          return items.toSorted((lhs: ParkingLotItem, rhs: ParkingLotItem) => {
            if (direction === 'Asc') {
              if (lhs[col] === rhs[col]) {
                return 0;
              }
              if (lhs[col] > rhs[col]) {
                return -1;
              }
              return 1;
            } else {
              if (lhs[col] === rhs[col]) {
                return 0;
              }
              if (lhs[col] < rhs[col]) {
                return -1;
              }
              return 1;
            }
          });
        } else {
          return items.toSorted((lhs: ParkingLotItem, rhs: ParkingLotItem) => {
            const d1 = new Date(lhs.created);
            const d2 = new Date(rhs.created);
            if (direction === 'Asc') {
              if (d1 === d2) return 0;
              if (d1 > d2) return 1;
              return -1;
            } else {
              if (d1 === d2) return 0;
              if (d1 < d2) return 1;
              return -1;
            }
          });
        }
      }),
    };
  }),
  withHooks({
    onInit() {
      // setInterval(() => {
      //   store.itemsResource.reload();
      // }, 10000)
    },
  }),
);
