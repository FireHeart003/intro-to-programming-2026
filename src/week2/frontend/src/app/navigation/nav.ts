import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabindex="-1"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            @for (linky of links(); track linky.path) {
              <li>
                <a class="" [routerLinkActive]="['link', 'link-info']" [routerLink]="linky.path">{{
                  linky.label
                }}</a>
              </li>
            }
          </ul>
        </div>
        <a class="btn btn-ghost text-xl">Intro Class</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          @for (linky of links(); track linky.path) {
            <li>
              <a class="" [routerLinkActive]="['link', 'link-info']" [routerLink]="linky.path">{{
                linky.label
              }}</a>
            </li>
          }
        </ul>
      </div>
      <div class="navbar-end">
        <a class="btn">Login</a>
      </div>
    </div>
  `,
  styles: ``,
})
export class Nav {
  protected readonly links = signal([
    {
      label: 'Home Page',
      path: ['home'],
    },
    {
      label: 'Banking',
      path: ['banking'],
    },
  ]);
}
