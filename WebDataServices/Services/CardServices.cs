
using Phyah.Services.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Phyah.WebDataServices.Services
{
    public class CardServices : Service<Card>, ICardService
    {
        public CardServices(DbContext Context) : base(Context)
        {
        }
        public CardServices() : this(new DataContext()) { }
    }
}
