import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { Counter } from './widgets/counter';
import { StatusCheck } from './pages/status-check';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'banking',
    loadChildren: () => import('./areas/banking/banking-routes').then((r) => r.bankingRoutes),
  },
  {
    path: 'parking-lot',
    loadChildren: () =>
      import('./areas/parking-lot/parking-lot-routes').then((r) => r.parkingLotRoutes),
  },
  {
    path: 'counter',
    component: Counter,
  },
  {
    path: 'status',
    component: StatusCheck,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
