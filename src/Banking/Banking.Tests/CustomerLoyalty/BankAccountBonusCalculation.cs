using Banking.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Banking.Tests.CustomerLoyalty;

public class BankAccountBonusCalculation
{
    [Fact]
    public void AccountsWithCorrectBalanceGetBonus()
    {
        var bc = new StandardBonusCalculator();
        var bonus = bc.CalculateBonusFor(5000, 100);

        Assert.Equal(10, bonus);
    }

    [Fact]
    public void AccountsWithLowBalanceGetNoBonus()
    {
        var bc = new StandardBonusCalculator();
        var bonus = bc.CalculateBonusFor(4999.99M, 100);

        Assert.Equal(0, bonus);
    }
}
