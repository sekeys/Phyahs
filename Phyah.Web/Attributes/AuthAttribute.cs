using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Web.Attributes
{

    public class AuthAttribute : VerbAttribute
    {
        public AuthAttribute() : base(Enumerable.Verbs.Auth)
        {
        }
    }
}
