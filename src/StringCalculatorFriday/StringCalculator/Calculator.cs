
public class Calculator
{
    public int Add(string numbers)
    {
        return numbers == "" ? 0 : int.Parse(numbers);
    }
}
