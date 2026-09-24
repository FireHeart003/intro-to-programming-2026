import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ParkingLotStore } from './stores/parking-lot';

@Component({
  selector: 'app-parking-lot',
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex flex-row gap-4 p-4">
      <a class="btn btn-accent btn-outline" routerLink="list">List</a>
      <a class="btn btn-accent btn-outline" routerLink="add">Add an Item</a>
      <p>You have {{ countOfItems() }} items in the parking lot, yo!</p>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class Home {
  protected readonly store = inject(ParkingLotStore);

  protected readonly countOfItems = computed(() => {
    const items = this.store.itemsResource.value() || [];

    if (this.store.itemsResource.isLoading() || this.store.itemsResource.error()) {
      return 'N/A';
    }
    return items.length;
  });
}
