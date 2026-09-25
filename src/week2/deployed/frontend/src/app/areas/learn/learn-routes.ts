import { Routes } from '@angular/router';
import { Home } from './home';
import { List } from './pages/list';

export const learningRouotes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: 'list',
        component: List,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
