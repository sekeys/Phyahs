using Microsoft.AspNetCore.Http;
using Phyah.Enumerable;
using Phyah.Interface;

namespace Phyah.Web
{
    public interface IProcessor
    {
        HttpContext HttpContext { get; }
        IPath Path { get; }
        Verbs Verb { get; }

        void Process();
    }
}