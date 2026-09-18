using System;
using System.Collections.Generic;
using System.Text;

namespace Banking.Domain;

public class StandardBonusCalculator : IProvideBonusesForBankAccountDeposits
{
    public decimal CalculateBonusFor(decimal currentBalance, TransactionAmount amountToDeposit)
    {
       return currentBalance >= 5000 ? amountToDeposit * 0.10M : 0;
    }
}
