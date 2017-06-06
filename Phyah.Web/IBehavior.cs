

namespace Phyah.Web
{
    using Phyah.Interface;
    using System.Threading.Tasks;
    public interface IBehavior
    {
        IParameter Parameter { get; }
        string Text { get; }
        Task Invoke();
    }
}