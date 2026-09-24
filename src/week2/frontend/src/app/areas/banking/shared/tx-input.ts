import { Component, inject, input } from '@angular/core';
import { AccountStore } from '../account-store';

@Component({
  selector: 'app-banking-transaction',
  imports: [],
  template: `
    <div>
      <label for="amount" class="label"
        >Amount:

        <input
          (input)="service.setTxAmount(amt.valueAsNumber)"
          type="number"
          #amt
          data-testid="amount-input"
          class="input input-primary"
        />
      </label>
      <button
        [disabled]="service.wouldOverdraft()"
        (click)="doTransaction(amt.valueAsNumber)"
        class="btn btn-secondary"
      >
        Perform {{ transactionType() }}
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
