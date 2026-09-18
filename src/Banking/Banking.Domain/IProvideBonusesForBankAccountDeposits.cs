namespace Banking.Domain;

public interface IProvideBonusesForBankAccountDeposits
{
    decimal CalculateBonusFor(decimal currentBalance, TransactionAmount amountToDeposit);
}