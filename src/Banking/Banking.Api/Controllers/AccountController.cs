using Banking.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Banking.Api.Controllers;

public class AccountController(IProvideBonusesForBankAccountDeposits bonusCalculator) : ControllerBase
{

    [HttpGet("/account")]
    public ActionResult  GetAccount()
    {
        var amount = bonusCalculator.CalculateBonusFor(10000, 1000);
        return Ok("Did it: " + amount);
    }

    [HttpPost("/account/deposit")]
    public ActionResult DoDeposit([FromBody] Transaction request, [FromServices] BankAccount account)
    {
        account.Deposit(request.Amount);
        var result = account.GetBalance();
        return Ok(new Transaction(result));
    }
}

public record Transaction(decimal Amount);