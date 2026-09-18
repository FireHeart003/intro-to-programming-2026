
using Banking.Domain;
using Banking.Tests.TestDoubles;

namespace Banking.Tests.Account;

public class MakingWithdrawals
{

    [Fact]
    public void MakingAWithdrawalLowersTheBalance()
    {
        var account = new BankAccount(new DummyBonusCalculator());
        var openingBalance = account.GetBalance();
        var amountToWithdraw = 100.25M;

        account.Withdraw(amountToWithdraw);

        Assert.Equal<decimal>(openingBalance.Amount - amountToWithdraw, account.GetBalance().Amount);

    }

    [Fact]
    public void OnOverdraftBalanceIsRetained()
    {
        var account = new BankAccount(new DummyBonusCalculator());
        var openingBalance = account.GetBalance();
        var amountToWithdraw = 1;

        try
        {
            account.Withdraw(amountToWithdraw + openingBalance.Amount);

        }
        catch(Exception)
        {
            // don't care... 
        }
        finally
        {
            Assert.Equal(openingBalance.Amount, account.GetBalance().Amount);

        }
    }

    [Fact]
    public void OnOverdraftAnExceptionIsThrown()
    {
        var account = new BankAccount(new DummyBonusCalculator());


        Assert.Throws<OverdraftException>(() => account.Withdraw(account.GetBalance().Amount + .01M)
    );


    }

    [Fact]
    public void CanWithdrawFullBalance()
    {

        var account = new BankAccount(new DummyBonusCalculator());

        account.Withdraw(account.GetBalance().Amount);

        Assert.Equal(0, account.GetBalance().Amount);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public void InvalidAmounts(decimal amount)
    {
        var account = new BankAccount(new DummyBonusCalculator());
        var openingBalance = account.GetBalance();
 

        Assert.Throws<InvalidTransactionAmountException>(() =>
        {
            account.Withdraw(amount);
            
        });

        Assert.Throws<InvalidTransactionAmountException>(() =>
        {
            
            account.Deposit(amount);
        });


        Assert.Equal<decimal>(openingBalance, account.GetBalance());

       
    }
}
