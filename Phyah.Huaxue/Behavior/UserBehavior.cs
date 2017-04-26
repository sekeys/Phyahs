using Phyah.Huaxue.Biz;
using Phyah.Huaxue.Models;
using Phyah.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phyah.Huaxue
{
    public class UserBehavior : RestBehavior
    {
        readonly UsersService Service;
        public override string Text => "Users";
        public UserBehavior()
        {
            Service = new UsersService();
        }
        public async Task Get()
        {
            try
            {
                await Json(Service.FindAll().Select(m => new { Id = m.Id, UserName = m.UserName, Nick = m.UserName }));
            }
            catch (Exception ex)
            {
                await Status(StatusCode.UNKNOWERROR, ex.Message);
            }
        }
        public async Task Post()
        {
            try
            {
                Service.Add(new Models.Users()
                {
                    Id = Guid.NewGuid().ToString(),
                    Nick = Request.Form["nick"],
                    Password = Request.Form["pwd"],
                    UserName = Request.Form["name"]
                });
            }
            catch (Exception ex)
            {
                await Status(StatusCode.UNKNOWERROR, ex.Message);
            }
        }
        public async Task Head()
        {
            try
            {
                await Json((from item in Service.Context.Set<Users>()
                            where item.Id == Request.Query["id"]
                            select item).FirstOrDefault());
            }
            catch (Exception ex)
            {
                await Status(StatusCode.UNKNOWERROR, ex.Message);
            }
        }
        public async Task PUT()
        {
            try
            {
                Service.Update(new Models.Users()
                {
                    Id = Request.Form["id"],
                    Nick = Request.Form["nick"],
                    Password = Request.Form["pwd"]
                });
            }
            catch (Exception ex)
            {
                await Status(StatusCode.UNKNOWERROR, ex.Message);
            }
        }
    }
}
