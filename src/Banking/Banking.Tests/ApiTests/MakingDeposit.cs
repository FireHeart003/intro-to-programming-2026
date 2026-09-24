using Alba;
using Banking.Domain;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using NSubstitute;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace Banking.Tests.ApiTests;

public class MakingDeposit
{
    [Fact]
    public async Task MakingADepositThroughTheApiIncreasesTheBalance()
    {
        var fakeBc = Substitute.For<IProvideBonusesForBankAccountDeposits>();
        var host = await AlbaHost.For<Program>(config => {

            config.ConfigureTestServices(sp =>
            {
                sp.AddScoped<IProvideBonusesForBankAccountDeposits>(_ => fakeBc);
            });
        });

        var response = await host.Scenario(api =>
        {
            api.Post
            .Json(new Tx(100))
            .ToUrl("/account/deposit");
        });

        var body = response.ReadAsJson<Tx>();
        Assert.NotNull(body);

        Assert.Equal(5100, body.Amount);
    }
}


public record Tx(decimal Amount);