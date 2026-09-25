import { Routes } from '@angular/router';
import { Home } from './home';
import { Add } from './pages/add';
import { Details } from './pages/details';
import { List } from './pages/list';
import { ParkingLotStore } from './stores/parking-lot';

export const parkingLotRoutes: Routes = [
  {
    path: '',
    component: Home,
    providers: [ParkingLotStore],
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
