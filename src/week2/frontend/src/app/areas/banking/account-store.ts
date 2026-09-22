import { computed, effect } from '@angular/core';
import { sanitizeConfig, withStellarDevtools } from '@hypertheory-labs/stellar-ng-devtools';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

export const AccountStore = signalStore(
  withStellarDevtools('AccountStore', {
    description:
      'This store holds bank account information, and allows for deposits and withdrawals',
    sourceHint: '/src/app/areas/banking/account-store.ts',
    sanitize: sanitizeConfig<{ sessionToken: string }>({
      sessionToken: 'token',
    }),
  }),
  withState({
    currentBalance: 5000,
    txAmount: 0,
    email: 'jeff@hypertheory.com',
    ssn: '555-55-5555',
    sessionToken: '93898983',
  }),
  withMethods((store) => {
    return {
      setTxAmount: (amount: number) => patchState(store, { txAmount: amount }),
      deposit: (amount: number) =>
        patchState(store, {
          currentBalance: store.currentBalance() + amount,
        }),
      withdraw: (amount: number) =>
        patchState(store, {
          currentBalance: store.currentBalance() - amount,
        }),
    };
  }),
  withComputed((store) => {
    return {
      wouldOverdraft: computed(() => store.currentBalance() - store.txAmount() < 0),
    };
  }),
  withHooks({
    onInit(store) {
      // The first time an instance of this service is injected() into something.
      // GET from an API
      console.log('Created the AccountStore');
      const savedBalance = localStorage.getItem('account-balance');
      if (savedBalance && savedBalance !== 'null') {
        const balance = JSON.parse(savedBalance) as unknown as number;
        patchState(store, { currentBalance: balance });
      }
      watchState(store, (state) => {
        //console.log(state);
        // post to an API?
        localStorage.setItem('account-balance', JSON.stringify(state.currentBalance));
      });
    },
    onDestroy() {
      // when the service is destroyed - the "owner" of that service (the thing that provides it) is gone.
      console.log('The AccountStore has been destroyed!');
    },
  }),
);
