using Banking.Domain;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Text;

namespace Banking.Tests.CustomerLoyalty;

public class TimeBasedBonusCalculatorTests
{
    [Fact]

    public void DuringBusinessHoursYourGetABonus()
    {
        var fakeClock = Substitute.For<IProvideTheBusinessClock>();
        fakeClock.IsDuringBusinessHours().Returns(true);

        var calculator = new TimeBasedBonusCalculator(fakeClock);

        var bonus = calculator.CalculateBonusFor(5000, 100);
        Assert.Equal(10M, bonus);
    }

    [Fact]
    public void OutsideBusinessHoursYouDoNotGetABonus()
    {
        var fakeClock = Substitute.For<IProvideTheBusinessClock>();
        fakeClock.IsDuringBusinessHours().Returns(false);
        var calculator = new TimeBasedBonusCalculator(fakeClock);

        var bonus = calculator.CalculateBonusFor(5000, 100);
        Assert.Equal(0, bonus);
    }
}
