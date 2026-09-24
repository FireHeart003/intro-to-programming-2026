import { TestBed } from '@angular/core/testing';
import { AccountStore } from './account-store';
import { StandardBonusCalculator } from './standard-bonus-calculator';

// const dummyBonusCalculator: StandardBonusCalculator = {
//   calculateBonusForDeposit(a: number, b: number) {
//     return 0;
//   },
// };
describe('The Bank Store', () => {
  it('has an initial balance', () => {
    TestBed.configureTestingModule({
      providers: [
        AccountStore,
        StandardBonusCalculator,
        // {
        //   provide: StandardBonusCalculator,
        //   useValue: dummyBonusCalculator,
        // },q
      ],
    });
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
