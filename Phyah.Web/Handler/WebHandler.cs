



namespace Phyah.Web.Handler
{
    using System;
    using Microsoft.AspNetCore.Http;
    using Phyah.Concurrency;
    using Phyah.Interface;

    public abstract class WebHandler : IHandler
    {
        private HttpContext httpContext;
        private IUser user;
        public HttpContext HttpContext => httpContext;
        public IUser User => user;

        public IParameter Parameter => AbstractPipeline.Parameter;

        public WebHandler()
        {
        }
        public  void Handle()
        {
            httpContext = AccessorContext.DefaultContext.Get<HttpContext>();
            user = AccessorContext.DefaultContext.Get<IUser>();
            HandleCore();
        }
        protected abstract void HandleCore();
    }
}
