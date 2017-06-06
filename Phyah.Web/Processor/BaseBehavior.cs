

namespace Phyah.Web
{
    using System.Threading.Tasks;
    using Phyah.Interface;
    using Phyah.Concurrency;
    public abstract class BaseBehavior : IBehavior
    {
        public IParameter Parameter => AbstractPipeline.Parameter;
        public abstract string Text { get; }

        public abstract Task Invoke();
    }
}
