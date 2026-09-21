import { Component, inject } from '@angular/core';
import { AccountStore } from './account-store';

@Component({
  selector: 'app-banking-deposit',
  imports: [],
  template: `
    <div>
      <label for="amount" class="label"
        >Amount to Deposit

        <input type="number" #amt class="input input-primary" />
      </label>
      <button (click)="service.deposit(amt.valueAsNumber)" class="btn btn-primary">
        Make Deposit
      </button>
    </div>
  `,
  styles: ``,
})
export class Deposit {
  protected readonly service = inject(AccountStore);
}
