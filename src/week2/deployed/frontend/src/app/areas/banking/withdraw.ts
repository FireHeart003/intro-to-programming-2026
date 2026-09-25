import { Component, inject } from '@angular/core';
import { AccountStore } from './account-store';
import { TxInput } from './shared/tx-input';

@Component({
  selector: 'app-banking-withdraw',
  imports: [TxInput],
  template: ` <app-banking-transaction transactionType="Withdraw" /> `,
  styles: ``,
})
export class Withdraw {
  protected readonly service = inject(AccountStore);
}
