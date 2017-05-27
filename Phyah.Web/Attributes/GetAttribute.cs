using System;
using System.Collections.Generic;
using System.Text;
using Phyah.Enumerable;

namespace Phyah.Web.Attributes
{
    public class GetAttribute : VerbAttribute
    {
        public GetAttribute() : base(Verbs.Get)
        {
        }
    }
}
