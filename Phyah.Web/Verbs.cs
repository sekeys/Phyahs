using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Enumerable
{
    [Flags]
    public enum Verbs
    {
        Get,
        Post,
        Delete,
        Head,
        Put,
        Options,
        Unsafe,
        Auth,
        Other

    }
}
