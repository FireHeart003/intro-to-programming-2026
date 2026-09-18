
using Xunit.Sdk;

public class Calculator
{
    public int Add(string numbers)
    {
        string[] nums;
        if (numbers.StartsWith("//"))
        {
            int newLineIndex = numbers.IndexOf("\n");
            string split = numbers.Substring(2, newLineIndex);
            string numbersWithoutDel = numbers.Substring(newLineIndex + 1);
            nums = numbersWithoutDel.Split(split);
        }
        else
        {
            nums = numbers.Split(',', '\n');
        }

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
