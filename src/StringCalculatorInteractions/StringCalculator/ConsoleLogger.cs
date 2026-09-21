using System;
using System.Collections.Generic;
using System.Text;

namespace StringCalculator;

public class ConsoleLogger : ILogCalculationResults
{
    public void Write(string result)
    {
        Console.WriteLine(result);
    }
}
