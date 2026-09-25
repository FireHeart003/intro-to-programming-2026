import { Component, computed, inject, input } from '@angular/core';
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
        [disabled]="disableButton()"
        (click)="doTransaction(amt.valueAsNumber, amt)"
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

  disableButton = computed(
    () => this.transactionType() === 'Withdraw' && this.service.wouldOverdraft(),
  );
  doTransaction(amount: number, el: HTMLInputElement) {
    if (this.transactionType() === 'Deposit') {
      this.service.deposit(amount);
    } else {
      this.service.withdraw(amount);
    }
    el.value = '';
    el.focus();
  }
}
