import { Component, inject, input, output } from '@angular/core';
import { AccountStore } from '../account-store';

@Component({
  selector: 'app-banking-transaction',
  imports: [],
  template: `
    <div>
      <label for="amount" class="label"
        >Amount to {{ transactionType() }}

        <input
          (input)="service.setTxAmount(amt.valueAsNumber)"
          type="number"
          #amt
          class="input input-primary"
        />
      </label>
      <button
        [disabled]="service.wouldOverdraft() && transactionType() === 'Withdraw'"
        (click)="doTransaction(amt.valueAsNumber)"
        class="btn btn-primary"
      >
        Make {{ transactionType() }}
      </button>
    </div>
  `,
  styles: ``,
})
export class TxInput {
  transactionType = input.required<'Deposit' | 'Withdraw'>();
  protected readonly service = inject(AccountStore);

  doTransaction(amount: number) {
    if (this.transactionType() === 'Deposit') {
      this.service.deposit(amount);
    } else {
      this.service.withdraw(amount);
    }
  }
}
