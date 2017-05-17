
namespace Phyah.Behind.Logic
{
    using System;
    using System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;
    using Phyah.Behind.Entities;
    using Phyah.Behind.ILogic;
    using System.Linq;
    using System.Threading.Tasks;

    public class MenuService : Service<Sys_Menu>, IMenuService
    {
        

        public MenuService() : base(new DataContext()) { }
        public IList<Menu> MenuInRole(Role role)
        {
            var result = from r in Context.Set<Role>()
                         join rm in Context.Set<RoleMenus>()
                         on r.Id equals rm.RoleId
                         where r.Id == role.Id

                         join m in Context.Set<Menu>()
                         on rm.MenuId equals m.Id
                         select m;
            return result.ToList();
        }

        public Task<IList<Menu>> MenuInRoleAsync(Role role)
        {
            throw new NotImplementedException();
        }

        public IList<Menu> MenuInRoles(IEnumerable<Role> role)
        {
            throw new NotImplementedException();
        }

        public Task<IList<Menu>> MenuInRolesAsync(IEnumerable<Role> role)
        {
            throw new NotImplementedException();
        }
    }
}
