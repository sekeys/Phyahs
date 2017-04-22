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
            await HtmlFile(@"E:\DevSource\Phyah\Phyah.Huaxue\Behind\dashbord.html");
            //HttpContext.Response.
        }
    }
}
