using Phyah.Huaxue.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phyah.Huaxue.Biz
{
    public class UsersService:ServiceBase<Users>
    {
        public UsersService():base(new DataContext())
        {

        }

    }
}
