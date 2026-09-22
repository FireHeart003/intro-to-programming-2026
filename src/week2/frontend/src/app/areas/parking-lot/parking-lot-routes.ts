import { Routes } from '@angular/router';
import { Home } from './home';
import { Details } from './pages/details';
import { List } from './pages/list';
import { Add } from './pages/add';

export const parkingLotRoutes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: 'details/:id',
        component: Details,
      },
      {
        path: 'list',
        component: List,
      },
      {
        path: 'add',
        component: Add,
      },
    ],
  },
];
