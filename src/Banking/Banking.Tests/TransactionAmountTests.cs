using Banking.Domain;
using Banking.Tests.TestDoubles;
using System;
using System.Collections.Generic;
using System.Text;

namespace Banking.Tests;

public class TransactionAmountTests
{
    [Fact]
    public void Taco()
    {


        TransactionAmount tt = TransactionAmount.From(99); // factory 

        Assert.Equal(99, tt.Value);

        var tt1 = TransactionAmount.From(99);

        decimal a = tt1;


        Assert.Throws<InvalidTransactionAmountException>(() => TransactionAmount.From(0));
    }

    [Fact]
    public void Watermelon()
    {
        var account = new BankAccount(new DummyBonusCalculator());

        var statement = account.GetBalance();
        Assert.Equal(5000, statement.Amount);
        Assert.Equal(DateTimeOffset.UtcNow, statement.AsOf,
            TimeSpan.FromMilliseconds(500));

    }

}
