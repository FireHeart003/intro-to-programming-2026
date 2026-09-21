using System;
using System.Collections.Generic;
using System.Text;

namespace StringCalculator;

public class CalculatorInteractionTests
{
    [Theory]
    [InlineData("1,2", "3")]
    [InlineData("4,5", "9")]
    public void ResultsAreWrittenToTheLogger(string numbers, string log)
    {
        // mock
        var mockedLogger = Substitute.For<ILogCalculationResults>();
        var mockedNotifier = Substitute.For<INotifyTechSupportOfLoggingFailures>();

        var calculator = new Calculator(mockedLogger, mockedNotifier);

        calculator.Add(numbers);

        mockedLogger.Received().Write(log);
        mockedNotifier.DidNotReceive().Notify(Arg.Any<string>());
    }

    [Theory]
    [InlineData("3", "Failed to log 3")]
    [InlineData("99", "Failed to log 99")]
    public void WhenLoggerFailsWebServiceIsCalled(string nums, string loggerMesage)
    {
        // stub
        var stubbedLogger = Substitute.For<ILogCalculationResults>();
        var mockedNotifier = Substitute.For<INotifyTechSupportOfLoggingFailures>();
        var calculator = new Calculator(stubbedLogger, mockedNotifier);

        stubbedLogger.When(l => l.Write(Arg.Any<string>())).Throw<LoggingException>();

        calculator.Add(nums);

        mockedNotifier.Received().Notify(loggerMesage);
    }

}
