

namespace Phyah.Behind.ILogic
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using System.Text;
    using System.Threading.Tasks;
    using System.Linq;
    using Phyah.Behind.Entities;

    public interface IMenuService : IService<Sys_Menu>
    {
        IList<Menu> MenuInRole(Role role);
        IList<Menu> MenuInRoles(IEnumerable<Role> role);
        Task<IList<Menu>> MenuInRoleAsync(Role role);
        Task<IList<Menu>> MenuInRolesAsync(IEnumerable<Role> role);
    }
}
