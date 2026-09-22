import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AccountStore } from './account-store';
import { TxInput } from './shared/tx-input';

@Component({
  selector: 'app-banking-deposit',
  imports: [TxInput],
  template: `
    <app-banking-transaction transactionType="Deposit" />
    <p>{{ crazyNumber() }}</p>
  `,
  styles: ``,
})
export class Deposit implements OnInit, OnDestroy {
  protected readonly service = inject(AccountStore);
  protected readonly crazyNumber = signal(0);
  doIt(amount: number) {
    this.crazyNumber.update((cn) => cn + amount);
  }
  constructor() {
    // some work to do when this is created.
    // angular before 20 - we injected services in the constructor
  }
  ngOnDestroy(): void {
    console.log('Oh no! destroying the deposit component!');
  }
  ngOnInit(): void {
    console.log('Created the deposit component! Yay!');
  }
}
