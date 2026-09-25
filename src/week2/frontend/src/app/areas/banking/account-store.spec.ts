import { TestBed } from '@angular/core/testing';
import { AccountStore } from './account-store';
import { StandardBonusCalculator } from './standard-bonus-calculator';

// const dummyBonusCalculator: StandardBonusCalculator = {
//   calculateBonusForDeposit(a: number, b: number) {
//     return 0;
//   },
// };
describe('The Bank Store', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountStore,
        StandardBonusCalculator,
        // {
        //   provide: StandardBonusCalculator,
        //   useValue: dummyBonusCalculator,
        // },
      ],
    });
  });
  it.skip('Opening Balance is Correct', async () => {
    const store = TestBed.inject(AccountStore);
    expect(store.currentBalance()).toBe(5000);
  });
  it.skip('Can do withdrawals', () => {
    const store = TestBed.inject(AccountStore);
    const openingBalance = store.currentBalance();

    store.withdraw(80.23);

    expect(store.currentBalance()).toBe(openingBalance - 80.23);
  });

  it('has an initial balance', () => {
    const store = TestBed.inject(AccountStore);
    const bc = TestBed.inject(StandardBonusCalculator);

    vi.spyOn(bc, 'calculateBonusForDeposit').mockReturnValue(42);

    expect(store).toBeDefined();
    const openingBalance = store.currentBalance();
    const amountToDeposit = 100;

    store.deposit(amountToDeposit);

    expect(store.currentBalance()).toBe(openingBalance + amountToDeposit + 42);
  });
});
