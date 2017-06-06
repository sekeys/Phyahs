using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Web
{
    public interface IFilter
    {
        bool OnFilting(HttpContext context);
    }
}
