using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Web.Attributes
{

    public class UnsafeAttribute : VerbAttribute
    {
        public UnsafeAttribute() : base(Enumerable.Verbs.Unsafe)
        {
        }
    }
}
