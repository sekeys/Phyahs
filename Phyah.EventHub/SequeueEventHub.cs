

namespace Phyah.EventHub
{

    using System;
    using System.Threading.Tasks;
    using Phyah.Concurrency;

    public class SequeueEventHub : EventHub
    {
        public SequeueEventHub() : base(new IndependentThreadExecutor("IndependentThreadExecutor Hub", TimeSpan.Zero), new DefaultReceptorStore())
        {
        }
    }
}