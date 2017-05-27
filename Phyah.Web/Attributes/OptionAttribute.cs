using Phyah.Enumerable;
using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Web.Attributes
{
    public class OptionAttribute : VerbAttribute
    {
        public OptionAttribute() : base(Verbs.Options)
        {
        }
    }
}
