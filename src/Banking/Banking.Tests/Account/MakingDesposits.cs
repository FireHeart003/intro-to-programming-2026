using Banking.Domain;
using Banking.Tests.TestDoubles;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Text;

namespace Banking.Tests.Account;

public class MakingDesposits
{
    [Theory]
    [InlineData(1.25)]
    [InlineData(500.23)]

    public void DepositingIncreasesTheBalance(decimal amount)
    {
        // Given
        var account = new BankAccount(Substitute.For<IProvideBonusesForBankAccountDeposits>());
        var openingBalance = account.GetBalance();


        // When
        account.Deposit(TransactionAmount.From(amount));

        // Then

        Assert.Equal<decimal>(openingBalance.Amount + amount, account.GetBalance());

    }


    [Fact]
    public void Avacado()
    {
        var c1 = new Customer { Name = "Bob", CreditLimit = 100 };
        var c2 = new Customer { Name = "Bob", CreditLimit = 100 };
        // var c2 = c1;
        var c3 = c1 with { Name = "Robert" };

        Assert.Equal(c1, c2);


        Assert.Equal("Robert", c3.Name);
        Assert.Equal("Bob", c1.Name);
        Assert.Equal(100, c3.CreditLimit);


    }


}

public record Customer
{
    public required string Name { get; init; }
    public decimal CreditLimit { get; init; }
}
