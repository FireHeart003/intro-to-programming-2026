namespace Banking.Domain;

public class BusinessClock(TimeProvider clock) : IProvideTheBusinessClock
{
    public bool IsDuringBusinessHours()
    {
        var easternTimeZone = GetEasternTimeZone();
       
        var easternTime = TimeZoneInfo.ConvertTime(clock.GetUtcNow(), easternTimeZone);

        if (easternTime.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday)
        {
            return false;
        }

        var timeOfDay = easternTime.TimeOfDay;

        return timeOfDay >= TimeSpan.FromHours(9)
            && timeOfDay <= TimeSpan.FromHours(16);
    }

    public static TimeZoneInfo GetEasternTimeZone()
    {
        try
        {
            return TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
        }
        catch (TimeZoneNotFoundException)
        {
            return TimeZoneInfo.FindSystemTimeZoneById("America/New_York");
        }
    }
}