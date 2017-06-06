using Phyah.Interface;

namespace Phyah.Concurrency
{
    public interface IHandler
    {
        IParameter Parameter { get; }
        void Handle();
    }
}
