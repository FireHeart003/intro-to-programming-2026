import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-learn-home',
  imports: [RouterOutlet],
  template: `
    <h2 class="text-2xl font-black">Learning Center</h2>

    <div class="m-4 p-4 bg-base-200">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class Home {}
