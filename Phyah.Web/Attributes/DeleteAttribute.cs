using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Web.Attributes
{
    public class DeleteAttribute : VerbAttribute
    {
        public DeleteAttribute() : base(Enumerable.Verbs.Delete)
        {
        }
    }
}
