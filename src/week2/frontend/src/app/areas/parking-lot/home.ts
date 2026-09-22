import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-parking-lot',
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex flex-row gap-4 p-4">
      <a class="btn btn-accent btn-outline" routerLink="list">List</a>
      <a class="btn btn-accent btn-outline" routerLink="add">Add an Item</a>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class Home {}
