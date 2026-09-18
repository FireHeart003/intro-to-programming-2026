using Banking.Domain;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Text;

namespace Banking.Tests;

public class AccountUsesBonusCalculator
{
    [Fact]
    public void BonusIsAddedToTheBalance()
    {
        // given
        var stubbedBonusCalculator = Substitute.For<IProvideBonusesForBankAccountDeposits>();
        var account = new BankAccount(stubbedBonusCalculator);
        stubbedBonusCalculator.CalculateBonusFor(account.GetBalance().Amount, 100).Returns(42.89M);


        // when
        account.Deposit(100.0M);


        // then
        var newBalance = account.GetBalance().Amount;

        Assert.Equal(5142.89M, newBalance);

    }
}

public class StubbedTestingBonusCalculator : IProvideBonusesForBankAccountDeposits
{
    public decimal CalculateBonusFor(decimal currentBalance, TransactionAmount amountToDeposit)
    {
        return currentBalance == 5000M && amountToDeposit == 100 ? 42.89M : 0;
    }
}