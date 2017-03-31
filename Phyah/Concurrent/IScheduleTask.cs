

namespace Phyah.Concurrent
{
    using System.Runtime.CompilerServices;
    using System.Threading.Tasks;

    public interface IScheduledTask
    {
        bool Cancel();
        PreciseTimeSpan Deadline { get; }
        Task Completion { get; }
        TaskAwaiter GetAwaiter();
    }
}
