import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

export const AccountStore = signalStore(
  withState({
    currentBalance: 5000,
    txAmount: 0,
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
      console.log('The AccountStore Has Been Created');
    },
    onDestroy(store) {
      console.log('The AccountStore has been destroyed!');
    },
  }),
);
