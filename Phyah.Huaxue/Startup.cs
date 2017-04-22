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
using Phyah.Web;
using Microsoft.Extensions.FileProviders;
using Phyah.Concurrency;
using Phyah.Web.Handler;

namespace Phyah.Huaxue
{
    public class Startup
    {


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        //public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        //{
        //    loggerFactory.AddConsole();

        //    if (env.IsDevelopment())
        //    {
        //        app.UseDeveloperExceptionPage();
        //    }

        //    app.Run(async (context) =>
        //    {
        //        await context.Response.WriteAsync("Hello World!");
        //    });
        //}

        public Startup(IHostingEnvironment env)
        {

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                
                .AddEnvironmentVariables();

            Configuration = builder.Build();

            AppSetting.AppSettings["hostdir"] = env.ContentRootPath;
            Phyah.Configuration.ConfigurationStartup.RootConfigurePath =
              System.IO.Path.Combine(env.ContentRootPath, "setting.json");

            Phyah.Configuration.ConfigurationManager.Manager.Configure();
            Phyah.Web.Initialization.Initialize();
            Phyah.Web.Initialization.InitializePipeline(new StaticPipeline(
                () => { },
                () => { },
                (ex) =>
                {
                    AccessorContext.DefaultContext.Get<HttpContext>().Response.WriteAsync(ex.ToString());
                })
                .AddLast(new InitializedHandler())
                .AddLast(new ProcessHandler())
                );
            Phyah.Web.BehaviorFactory.Factory.Cache(typeof(IndexBehavior));
            Phyah.Web.BehaviorFactory.Factory.Cache(typeof(DashbordBehavior));
            Phyah.Web.BehaviorFactory.Factory.Cache(typeof(UserBehavior));
            Phyah.Web.BehaviorFactory.Factory.Cache(typeof(UserListBehavior));
            Phyah.Web.BehaviorFactory.Factory.Cache(typeof(CardBehavior));
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication();
        }

        public IConfigurationRoot Configuration { get; private set; }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(System.IO.Path.Combine(env.ContentRootPath, @"wwwroot")),
                RequestPath = new PathString("/wwwroot")
            });

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(System.IO.Path.Combine(env.ContentRootPath, @"assets")),
                RequestPath = new PathString("/assets")
            });
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationScheme = Phyah.Web.SecurityFormTicks.Schema,
                LoginPath = new PathString("/login"),
                AccessDeniedPath = new PathString("/Forbidden"),
                CookieName = ".u",
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
            });
            app.UseMiddleware<PhyahMiddleware>();
        }
    }
}
