public class Calculator(ILogCalculationResults logger,
    INotifyTechSupportOfLoggingFailures notifier)
{
    public int Add(string numbers)
    {
        var result =  numbers == "" ? 0 : numbers.Split(',', '\n').Select(int.Parse).Sum();

        // write to logger here
        try
        {
            logger.Write(result.ToString());
        }
        catch (LoggingException)
        {
            //gulp
            notifier.Notify($"Failed to log {result}");
        }

        return result;
    }
}

public interface ILogCalculationResults
{
    void Write(string result);
}

public interface INotifyTechSupportOfLoggingFailures
{
    void Notify(string message);
}

public class LoggingException : ApplicationException;