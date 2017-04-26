using Microsoft.AspNetCore.Http;
using Phyah.Configuration;
using Phyah.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phyah.Huaxue
{
    public class DashbordBehavior : Behavior
    {
        public override string Text => "dashbord";

        public async override Task Invoke()
        {
            

            string content = System.IO.File.ReadAllText($@"{AppSetting.AppSettings["hostdir"]}\Behind\dashbord.html");
            await HttpContext.Response.WriteAsync(content);
            //HttpContext.Response.
        }
    }
}
