

namespace StringCalculator;
public class CalculatorTests
{
    [Fact]
    public void EmptyStringReturnsZero()
    {
        var calculator = new Calculator(Substitute.For<ILogCalculationResults>(), Substitute.For<INotifyTechSupportOfLoggingFailures>());

        var result = calculator.Add("");

        Assert.Equal(0, result);
    }
}
