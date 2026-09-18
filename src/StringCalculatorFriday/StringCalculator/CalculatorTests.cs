

namespace StringCalculator;
public class CalculatorTests
{
    [Fact]
    public void EmptyStringReturnsZero()
    {
        var calculator = new Calculator();

        var result = calculator.Add("");

        Assert.Equal(0, result);
    }

    [Theory]
    [InlineData("2", 2)]
    [InlineData("20", 20)]
    [InlineData("200", 200)]
    public void SingleInteger(string num, int expected)
    {
        var calculator = new Calculator();

        var result = calculator.Add(num);

        Assert.Equal(expected, result);
    }
}
