using Banking.Domain;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Text;

namespace Banking.Tests;

public class AccountUsesBonusCalculator
{
    [Theory]
    [InlineData(100)]
    [InlineData(225.39)]
    public void BonusIsAddedToTheBalance(decimal amountToDeposit)
    {
        // given
        var stubbedBonusCalculator = Substitute.For<IProvideBonusesForBankAccountDeposits>();
        var account = new BankAccount(stubbedBonusCalculator);
        var openingBalance = account.GetBalance().Amount;
        stubbedBonusCalculator.CalculateBonusFor(openingBalance, amountToDeposit).Returns(42.89M);
        

        // when
        account.Deposit(amountToDeposit); // <--- Account's Deposit method


        // then
        var newBalance = account.GetBalance().Amount;

        Assert.Equal(openingBalance + amountToDeposit + 42.89M, newBalance);

    }
}

public class StubbedTestingBonusCalculator : IProvideBonusesForBankAccountDeposits
{
    public decimal CalculateBonusFor(decimal currentBalance, TransactionAmount amountToDeposit)
    {
        return currentBalance == 5000M && amountToDeposit == 100 ? 42.89M : 0;
    }
}