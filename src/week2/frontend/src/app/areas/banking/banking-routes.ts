import { Routes } from '@angular/router';
import { Home } from './home';
import { Deposit } from './deposit';
import { Withdraw } from './withdraw';
import { AccountStore } from './account-store';
import { StandardBonusCalculator } from './standard-bonus-calculator';

export const bankingRoutes: Routes = [
  {
    path: '',
    providers: [AccountStore, StandardBonusCalculator],
    component: Home,
    children: [
      {
        path: 'deposit',
        component: Deposit,
      },
      {
        path: 'withdraw',
        component: Withdraw,
      },
    ],
  },
];
