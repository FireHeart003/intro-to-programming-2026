namespace Banking.Tests;

public class UnitTest1
{
    [Theory]
    [InlineData(2,2,4)]
    [InlineData(40,2,42)]
    [InlineData(6,3, 9)]
    public void CanAddTwoIntegers(int a, int b, int expected)
    {
        // Given - sometimes "arrange", establish the context of the test
       
        // When - "Act" do something. Poke it, run a method, etc. This is your SUT
        int answer = a + b;
        // Then - "Assert" what can you observe that will prove to you that the "When" did what you expected it to do? This is your assertion
        Assert.Equal(expected, answer);
    }

    
}
