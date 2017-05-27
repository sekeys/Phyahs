using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Web.Attributes
{
    public class HeadAttribute : VerbAttribute
    {
        public HeadAttribute() : base(Enumerable.Verbs.Head)
        {
        }
    }
}
