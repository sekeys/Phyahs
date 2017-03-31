

namespace Phyah.Concurrent
{
    using Phyah.Interface;
    using System;

    public interface IScheduledRunnable : IRunnable, IScheduledTask, IComparable<IScheduledRunnable>
    {
    }
}