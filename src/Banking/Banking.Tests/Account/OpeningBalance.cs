using Banking.Domain;
using Banking.Tests.TestDoubles;

namespace Banking.Tests.Account;

public class OpeningBalance
{
    // Your tests should always be a measure of the current capabilities of your code.
    // documentation, kanban boards, sharepoint sites LIE - this is why developers hate 
    // documentation.
    [Fact]
    public void IsCorrect()
    {
        var account = new BankAccount(new DummyBonusCalculator()); // replace X with actual namespace
        decimal expectedBalance = 5000;

        decimal actualBalance = account.GetBalance().Amount;

        Assert.Equal(expectedBalance, actualBalance);
    }
}
