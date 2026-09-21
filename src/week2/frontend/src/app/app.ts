import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './navigation/nav';

@Component({
  imports: [RouterOutlet, Nav],
  selector: 'app-root',
  styles: [],
  template: `
    <app-navbar />
    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
})
export class App {}
