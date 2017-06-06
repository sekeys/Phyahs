

namespace WebDataApi
{
    using Microsoft.AspNetCore.Http;
    using Phyah.Web.Handler;
    public class HeaderProcesseHandler : WebHandler
    {
        public HttpRequest Request => HttpContext.Request;
        protected override void HandleCore()
        {
            if (Request.Headers.ContainsKey("crossys"))
            {
                Parameter.Set("system", Request.Headers["crossys"].ToString());
            }
            if (!Parameter.Contains("system"))
                Parameter.Set("system", Request.Host.Host.ToString().ToLower());

        }
    }
}
