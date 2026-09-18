namespace Banking.Domain;

// Code duplication is often a sign of a missing thingy.

// Primitive obsession - marten fowler code smell

// maintains the balance. 



public class BankAccount(IProvideBonusesForBankAccountDeposits bonusCalculator)
{
    // "fields"
    private decimal _currentBalance = 5000;
    public virtual void Deposit(TransactionAmount amountToDeposit)
    {
    
        decimal bonus = bonusCalculator.CalculateBonusFor(_currentBalance, amountToDeposit);

        _currentBalance += amountToDeposit + bonus;
    }



    public AccountStatement GetBalance()
    {

        return new AccountStatement(_currentBalance, DateTimeOffset.UtcNow);
    }

    public void Withdraw(TransactionAmount withdrawalAmount)
    {
      
        // if the amount <= throw
        if (_currentBalance - withdrawalAmount < 0)
        {
            throw new OverdraftException(); // different than common expectation    
        }
        else
        {
            _currentBalance -= withdrawalAmount;
        }
    }
}

public class OverdraftException : ArgumentOutOfRangeException;

public class InvalidTransactionAmountException : ArgumentException;

public record AccountStatement(decimal Amount, DateTimeOffset AsOf)
{
    public static implicit operator decimal(AccountStatement statement) => statement.Amount;
}