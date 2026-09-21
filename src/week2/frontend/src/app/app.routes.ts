import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { Account } from './areas/banking/account';

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
    path: '**',
    redirectTo: 'home',
  },
];
