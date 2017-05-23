using Phyah.Extensions;
using Phyah.Web;
using System;
using System.Threading.Tasks;

namespace Phyah.WebDataServices.Services
{
    public class CardBehavior : RestBehavior
    {
        private ICardService Service;

        public CardBehavior(ICardService service)
        {
            Service = service;
        }
        public CardBehavior()
        {

        }
        public override string Text => "card";
        public async Task Get()
        {
            var sys = Request.Query["card"].ToString();
            var current = Request.Query["current"].ToString().ToInt32(1);
            var size = Request.Query["count"].ToString().ToInt32(24);

            var result = await Service.PaginationAsync(current, size);
            await Json(new
            {
                status = 200,
                result = true,
                size = size,
                current = current,
                total = result.Item1,
                collection = result.Item2
            });
        }

        public async Task Post(Card card)
        {
            var result = await Service.NewOrUpdateAsync(card);
            await Json(new
            {
                status = 200,
                model = card,
                result=true
            });
        }
        public async Task Put(Card card)
        {
            var result = await Service.NewOrUpdateAsync(card);
            await Json(new
            {
                status = 200,
                model = card,
                result = true
            });
        }

    }
}
