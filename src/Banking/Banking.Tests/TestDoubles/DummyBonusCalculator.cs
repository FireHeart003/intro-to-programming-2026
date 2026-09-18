using Banking.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Banking.Tests.TestDoubles;

public class DummyBonusCalculator : IProvideBonusesForBankAccountDeposits
{
    public decimal CalculateBonusFor(decimal currentBalance, TransactionAmount amountToDeposit)
    {

        return 0;
    }
}
