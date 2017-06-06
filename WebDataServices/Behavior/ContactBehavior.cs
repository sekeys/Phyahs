﻿using Phyah.Extensions;
using Phyah.Web;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Phyah.WebDataServices.Services
{
    public class ContactBehavior : RestBehavior
    {
        public override string Text => "contact";
        private IContactorService Service;

        public ContactBehavior(IContactorService service)
        {
            Service = service;
        }
        public async Task Get()
        {
            var sys = Parameter.Get<string>("system");
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
        public async Task Options()
        {
            var sys = Parameter.Get<string>("system");
            Contactor card = Request.Form.Serialized<Contactor>();
            card.System = sys;
            var result = await Service.MultipleAsync();
            await Json(new
            {
                status = 200,
                model = card,
                result = true
            });
        }

        public async Task Post()
        {
            var sys = Parameter.Get<string>("system");
            Contactor model = Request.Form.Serialized<Contactor>();
            model.System = sys;
            var result = await Service.NewOrUpdateAsync(model);
            await Json(new
            {
                status = 200,
                model = model,
                result = true
            });
        }

        public async Task Head()
        {
            var sys = Parameter.Get<string>("system");
            string id = Request.Form["id"].ToString();
            var result = await Service.SingleAsync(id);
            await Json(new
            {
                status = 200,
                model = result,
                result = true
            });
        }
        public async Task Put()
        {
            var sys = Parameter.Get<string>("system");
            Contactor model = Request.Form.Serialized<Contactor>();
            model.System = sys;
            var result = await Service.NewOrUpdateAsync(model);
            await Json(new
            {
                status = 200,
                model = model,
                result = true
            });
        }
    }
}