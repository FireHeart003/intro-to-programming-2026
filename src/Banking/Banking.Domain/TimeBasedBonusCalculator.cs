namespace Banking.Domain;

public class TimeBasedBonusCalculator(IProvideTheBusinessClock clock) : IProvideBonusesForBankAccountDeposits
{
    public decimal CalculateBonusFor(decimal currentBalance, TransactionAmount amountToDeposit)
    {
        return clock.IsDuringBusinessHours() && currentBalance >= 5000
            ? amountToDeposit * 0.10M
            : 0;
    }

 
}
