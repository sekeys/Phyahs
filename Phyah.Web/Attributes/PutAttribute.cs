using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Web.Attributes
{

    public class PutAttribute : VerbAttribute
    {
        public PutAttribute() : base(Enumerable.Verbs.Put)
        {
        }
    }
}
