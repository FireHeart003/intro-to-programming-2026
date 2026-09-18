
using Xunit;

var a = new ShowSummary(Guid.Empty, "Severance");
var b = new ShowSummary(Guid.Empty, "Severance");

Assert.True(a == b);          // ?
Assert.False(ReferenceEquals(a, b));  // ?
public record ShowSummary(Guid Id, string Title);
