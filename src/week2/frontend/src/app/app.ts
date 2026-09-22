import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './navigation/nav';
import { StellarOverlayComponent } from '@hypertheory-labs/stellar-ng-devtools';

@Component({
  imports: [RouterOutlet, Nav, StellarOverlayComponent],
  selector: 'app-root',
  styles: [],
  template: `
    <app-navbar [companyName]="nameOfCompany()" />
    <main class="container mx-auto">
      <router-outlet />
    </main>
    <stellar-overlay />
  `,
})
export class App {
  nameOfCompany = signal('Intro Class');
}
