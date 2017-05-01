using System;

namespace Phyah.Core
{
    public interface IChannel
    {
        void Start();
        void Failed(Exception ex);
        void Abort();
        void Process(IParameter parameter);
    }
}
