
using System;
using System.Collections.Generic;
using System.Text;
using Phyah.Enumerable;

namespace Phyah.Web.Attributes
{
    public class PostAttribute : VerbAttribute
    {
        public PostAttribute() : base(Verbs.Post)
        {
        }
    }
}
