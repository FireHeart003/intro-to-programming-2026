using System;
using System.Collections.Generic;
using System.Text;

namespace Banking.Domain;

public class StandardBonusCalculator : IProvideBonusesForBankAccountDeposits, IProvideBonusesForCertificatesOfDeposit
{
    public decimal Calculate(decimal amount, TimeSpan period)
    {
        throw new NotImplementedException();
    }

    public decimal CalculateBonusFor(decimal currentBalance, TransactionAmount amountToDeposit)
    {
       return currentBalance >= 5000 ? amountToDeposit * 0.10M : 0;
    }
}


public interface IProvideBonusesForCertificatesOfDeposit
{
    decimal Calculate(decimal amount, TimeSpan period);
}