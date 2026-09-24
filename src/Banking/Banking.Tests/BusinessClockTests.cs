using Banking.Domain;
using Microsoft.Extensions.Time.Testing;
using System;
using System.Collections.Generic;
using System.Text;

namespace Banking.Tests;

public class BusinessClockTests
{
    [Theory(Skip ="Jeff Didn't Fix this yet.")]
    [MemberData(nameof(ClosedDates))]
    public void DuringBusinessHours(DateTimeOffset when)
    {

        var fakeClock = new FakeTimeProvider(when);
        var businessClock = new BusinessClock(fakeClock);
        Assert.True(businessClock.IsDuringBusinessHours());
    }

    [Theory(Skip ="Jeff went to a concert instead of fixing this")]
    [MemberData(nameof(OpenSamples))]
    public void AfterBusinessHours(DateTimeOffset when)
    {

        var fakeClock = new FakeTimeProvider(when);
        var businessClock = new BusinessClock(fakeClock);

        Assert.False(businessClock.IsDuringBusinessHours());

    }

    public static  TheoryData<DateTimeOffset> ClosedDates() =>

       [
          new DateTimeOffset(1969, 4, 20, 16, 10, 00, TimeSpan.FromHours(-4)),
         

       ];

    public static TheoryData<DateTimeOffset> OpenSamples() =>
        [
        new DateTimeOffset(2026,9,17,14,5,5,TimeSpan.FromHours(-4)),
        ];
    
}
