
using Xunit.Sdk;

public class Calculator
{
    public int Add(string numbers)
    {
        string[] nums = numbers.Split(',');
        if (nums.Length == 2 )
        {
            return int.Parse(nums[0]) + int.Parse(nums[1]);
        }

        return nums[0] == "" ? 0 : int.Parse(nums[0]);
    }
}
