# Lunch and Learn Planner

## Create the area

In `src/app/areas` create a new directory called `learn`. In that directory, create two source-code files:

- `learn-routes.ts` - this will hold this area's routes
- `home.ts` - this will be the landing page for the routed area.

### Home Page

The home page will have a router outlet for pages we will create in later steps. Here's a good starter:

<details>
<summary>Click here for the home.ts</summary>

```ts
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
```

</details>

### Routes

In the `learn-routes.ts` create the route:

<details>
<summary>`learn-routes.ts`</summary>

```ts
import { Routes } from '@angular/router';
import { Home } from './home';

export const learningRouotes: Routes = [
  {
    path: '',
    component: Home,
  },
];
```
</details>

## Create an app route and a link in `nav.ts`

In `src/app/app.routes.ts`, add a new route to lazy-load the new area:

(Hint: Add this before the `**` catch-all route):

<details>
<summary>Route</summary>

```ts

  {
    path: 'learning',
    loadChildren: () => import('./areas/learn/learn-routes').then((r) => r.learningRouotes),
  }

```
</details>

## Add a link

In `src/app/navigation/nav.ts` add a link to the `links` signal array:

<details>
<summary>Links</summary>

```ts
  protected readonly links = signal([
    {
      label: 'Home Page',
      path: ['home'],
    },
    {
      label: 'Banking',
      path: ['banking'],
    },
    {
      label: 'Learning',
      path: ['learning'],
    },
  ]);
```
</details>
