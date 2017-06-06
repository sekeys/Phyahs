using Phyah.Services.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace Phyah.WebDataServices.Services
{
    public class ContactorService : Service<Contactor>, IContactorService
    {
        public ContactorService(DbContext Context) : base(Context)
        {
        }
        public ContactorService() : this(new DataContext()) { }
    }
}
