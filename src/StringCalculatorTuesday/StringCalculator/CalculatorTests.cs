

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
    [InlineData("5", 5)]
    [InlineData("10", 10)]
    public void SingleInteger(string value, int expected)
    {
        var calculator = new Calculator();

        var result = calculator.Add(value);

        Assert.Equal(expected, result);
    }

    [Theory]
    [InlineData("2,2", 4)]
    [InlineData("3,5", 8)]
    [InlineData("200,150", 350)]
    public void TwoInteger(string value, int expected)
    {
        var calculator = new Calculator();

        var result = calculator.Add(value);

        Assert.Equal(expected, result);
    }
}
