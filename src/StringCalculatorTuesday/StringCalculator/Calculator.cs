
using Xunit.Sdk;

public class Calculator
{
    public int Add(string numbers)
    {
        string[] nums = numbers.Split(',');
        if (nums.Length >= 2 )
        {
            int sum = 0;

            foreach (string num in nums)
            {
                sum += int.Parse(num);
            }

            return sum;
        }

        return nums[0] == "" ? 0 : int.Parse(nums[0]);
    }
}
