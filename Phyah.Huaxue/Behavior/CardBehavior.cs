using Phyah.Huaxue.Biz;
using Phyah.Huaxue.Models;
using Phyah.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phyah.Huaxue
{
    public class CardsBehavior : RestBehavior
    {
        readonly CardInfoService Service;
        public override string Text => "cards";
        public CardsBehavior()
        {
            Service = new CardInfoService();
        }
        public async Task Get()
        {
            try
            {
                await Json(Service.FindAll());
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
                Service.Add(new Models.CardInfoes()
                {
                    Id = Guid.NewGuid().ToString(),
                    CardInfo = Request.Form["cardinfo"],
                    CardNo = Request.Form["cardNo"],
                    Description = Request.Form["description"],
                    Href = Request.Form["href"],
                    ImgSrc = Request.Form["imgsrc"]
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
                await Json((from item in Service.Context.Set<CardInfoes>()
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
                Service.Update(new Models.CardInfoes()
                {
                    Id = Request.Form["id"],
                    CardInfo = Request.Form["cardinfo"],
                    CardNo = Request.Form["cardNo"],
                    Description = Request.Form["description"],
                    Href = Request.Form["href"],
                    ImgSrc = Request.Form["imgsrc"]
                });
            }
            catch (Exception ex)
            {
                await Status(StatusCode.UNKNOWERROR, ex.Message);
            }
        }
    }
}
