using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Web.Router
{

    //
    // 摘要:
    //     A context object for Microsoft.AspNetCore.Routing.IRouter.RouteAsync(Microsoft.AspNetCore.Routing.RouteContext).
    public class RouteContext
    {
        //
        // 摘要:
        //     Creates a new Microsoft.AspNetCore.Routing.RouteContext for the provided httpContext.
        //
        // 参数:
        //   httpContext:
        //     The Microsoft.AspNetCore.Http.HttpContext associated with the current request.
        public RouteContext(HttpContext httpContext)
        {
            HttpContext = httpContext;
        }

        //
        // 摘要:
        //     Gets or sets the handler for the request. An Microsoft.AspNetCore.Routing.IRouter
        //     should set Microsoft.AspNetCore.Routing.RouteContext.Handler when it matches.
        public RequestDelegate Handler { get; set; }
        //
        // 摘要:
        //     Gets the Microsoft.AspNetCore.Http.HttpContext associated with the current request.
        public HttpContext HttpContext { get; }
    }
}
