import { TestBed } from '@angular/core/testing';
import { TxInput } from './tx-input';
import { inputBinding } from '@angular/core';
import { AccountStore } from '../account-store';
import { StandardBonusCalculator } from '../standard-bonus-calculator';
import { describe, it } from 'vitest';

// "Unit Integration" - we are testing this component, and using Angular at the same time,
// however, we aren't testing a specific use of this - that would be the system tests (playwright, e2e)
describe('The Transaction Input', () => {
  it('Deposit Text', async () => {
    const tb = TestBed.configureTestingModule({
      providers: [AccountStore, StandardBonusCalculator],
    });
    const fixture = tb.createComponent(TxInput, {
      bindings: [inputBinding('transactionType', () => 'Deposit')],
    });
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toBe(' Perform Deposit ');
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
  it('Button not disabled for deposit', async () => {
    const tb = TestBed.configureTestingModule({
      providers: [AccountStore, StandardBonusCalculator],
    });
    const as = tb.inject(AccountStore);
    vi.spyOn(as, 'wouldOverdraft').mockReturnValue(true);
    const fixture = tb.createComponent(TxInput, {
      bindings: [inputBinding('transactionType', () => 'Deposit')],
    });
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.textContent).toBe(' Perform Deposit ');
    expect(button.hasAttribute('disabled')).toBeFalsy();
  });
});
