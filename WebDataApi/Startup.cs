using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Phyah.Configuration;
using Microsoft.AspNetCore.Hosting.Internal;
using Phyah.Concurrency;
using Phyah.Web.Handler;
using Microsoft.AspNetCore.Routing;
using Phyah.Web;

namespace WebDataApi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)

                .AddEnvironmentVariables();

            Configuration = builder.Build();

            AppSetting.AppSettings["hostdir"] = env.ContentRootPath;

            Phyah.Web.HostingEnvironment.SetRootPath(env.ContentRootPath);

            Phyah.Configuration.ConfigurationStartup.RootConfigurePath =
              System.IO.Path.Combine(env.ContentRootPath, "setting.json");

            Phyah.Configuration.ConfigurationManager.Manager.Configure();
            Phyah.Web.Initialization.Initialize();
            Phyah.Web.Initialization.InitializePipeline(new StaticPipeline(
                () =>
                {
                    //var resp = AccessorContext.DefaultContext.Get<HttpContext>().Response;
                    //resp.StatusCode= 500;
                    //AccessorContext.DefaultContext.Get<HttpContext>().Response.WriteAsync("ex.ToString()");
                },
                () =>
                {
                    //AccessorContext.DefaultContext.Get<HttpContext>().Response.WriteAsync("ex.ToString()");
                },
                (ex) =>
                {
                    var resp = AccessorContext.DefaultContext.Get<HttpContext>().Response;
                    resp.Clear();
                    resp.WriteAsync(ex.ToString());

                })
                .AddLast(new InitializedHandler())
                .AddLast(new PathResetHandler())
                .AddLast(new HeaderProcesseHandler())
                .AddLast(new ProcessHandler())
                );
            Phyah.WebDataServices.Services.DataContext.ConnectionString = AppSetting.AppSettings["connectionString"]?.ToString();
            Phyah.TypeContainer.TypeContainer.Container.Inject(typeof(Phyah.WebDataServices.Services.IArticleService), typeof(Phyah.WebDataServices.Services.ArticleService));
            Phyah.TypeContainer.TypeContainer.Container.Inject(typeof(Phyah.WebDataServices.Services.ICardService), typeof(Phyah.WebDataServices.Services.CardServices));
            Phyah.TypeContainer.TypeContainer.Container.Inject(typeof(Phyah.WebDataServices.Services.IContactorService), typeof(Phyah.WebDataServices.Services.ContactorService));
            Phyah.Web.BehaviorFactory.Factory.Cache(typeof(Phyah.WebDataServices.Services.CardBehavior));
            Phyah.Web.BehaviorFactory.Factory.Cache(typeof(Phyah.WebDataServices.Services.ArticleBehavior));
            Phyah.Web.BehaviorFactory.Factory.Cache(typeof(Phyah.WebDataServices.Services.ContactBehavior));
           
        }
        public void ConfigureServices(IServiceCollection services)
        {
        }

        public IConfigurationRoot Configuration { get; private set; }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseMiddleware<PhyahMiddleware>();
        }
    }
}
