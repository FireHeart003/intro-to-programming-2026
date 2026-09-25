import { StandardBonusCalculator } from './standard-bonus-calculator';

describe('Standard Bonus Calculator', () => {
  it('Get the Bonus', () => {
    const bc = new StandardBonusCalculator();

    [
      {
        b: 5000,
        a: 100,
        x: 10,
      },
      {
        b: 5000,
        a: 200,
        x: 20,
      },
      {
        b: 6000,
        a: 1000,
        x: 100,
      },
    ].forEach((e) => expect(bc.calculateBonusForDeposit(e.b, e.a)).toBe(e.x));
  });

  it('No Bonus', () => {
    const bc = new StandardBonusCalculator();

    [
      {
        b: 4999.99,
        a: 100,
      },
      {
        b: 4000,
        a: 2000,
      },
      {
        b: 1,
        a: 1000,
      },
    ].forEach((e) => expect(bc.calculateBonusForDeposit(e.b, e.a)).toBe(0));
  });
});
