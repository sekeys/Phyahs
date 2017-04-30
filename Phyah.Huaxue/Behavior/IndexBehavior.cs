

namespace Phyah.Huaxue
{
    using Microsoft.AspNetCore.Http;
    using Phyah.Configuration;
    using Phyah.Web;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    public class IndexBehavior : Behavior
    {
        public override string Text => "Index";

        public  override Task Invoke()
        {
            
            string content= System.IO.File.ReadAllText($@"{AppSetting.AppSettings["hostdir"]}\index.html");
            return HttpContext.Response.WriteAsync(content);
            
            //HttpContext.Response.
        }
    }
    public class UserListBehavior : Behavior
    {
        public override string Text => "userlist";

        public async override Task Invoke()
        {
            //await HttpContext.Response.WriteAsync(System.IO.File.ReadAllText(@"E:\DevSource\Phyah\Phyah.Huaxue\index.html"));
            await HtmlFile(@"E:\DevSource\Phyah\Phyah.Huaxue\Behind\UserList.html");
            //HttpContext.Response.
        }
    }
    //public class CardBehavior : Behavior
    //{
    //    public override string Text => "card";

    //    public async override Task Invoke()
    //    {
    //        //await HttpContext.Response.WriteAsync(System.IO.File.ReadAllText(@"E:\DevSource\Phyah\Phyah.Huaxue\index.html"));
    //        await HtmlFile(@"E:\DevSource\Phyah\Phyah.Huaxue\Behind\card.html");
    //        //HttpContext.Response.
    //    }
    //}
}
