export class StandardBonusCalculator {
  calculateBonusForDeposit(balance: number, amountOfDeposit: number): number {
    return balance >= 5000 ? amountOfDeposit * 0.1 : amountOfDeposit;
  }
}
