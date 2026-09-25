import { TestBed } from '@angular/core/testing';
import { TxInput } from './tx-input';
import { inputBinding } from '@angular/core';
import { AccountStore } from '../account-store';
import { StandardBonusCalculator } from '../standard-bonus-calculator';
import { describe, it } from 'vitest';
describe('The Transaction Input', () => {
  it('Deposit Text', async () => {
    const tb = TestBed.configureTestingModule({
      providers: [AccountStore, StandardBonusCalculator],
    });
    const fixture = tb.createComponent(TxInput, {
      bindings: [inputBinding('transactionType', () => 'deposit')],
    });
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toBe(' Perform deposit ');
  });
  it('Withdraw Will not allow overdraft', async () => {
    const tb = TestBed.configureTestingModule({
      providers: [AccountStore, StandardBonusCalculator],
    });
    const as = tb.inject(AccountStore);
    vi.spyOn(as, 'wouldOverdraft').mockReturnValue(true);
    const fixture = tb.createComponent(TxInput, {
      bindings: [inputBinding('transactionType', () => 'Withdraw')],
    });
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.textContent).toBe(' Perform Withdraw ');
    expect(button.hasAttribute('disabled')).toBeTruthy();
  });
});
