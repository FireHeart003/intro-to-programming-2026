import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { StellarOverlayComponent } from '@hypertheory-labs/stellar-ng-devtools';
import { Nav } from './navigation/nav';

@Component({
  imports: [RouterOutlet, StellarOverlayComponent, Nav],
  selector: 'app-root',
  styles: [],
  template: `
    <app-navbar companyName="Intro" />
    <main class="container mx-auto">
      <router-outlet />
    </main>
    <stellar-overlay />
  `,
})
export class App {
  nameOfCompany = signal('Intro Class');
}
