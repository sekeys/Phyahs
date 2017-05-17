using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Behind.Entities
{
    public class RoleMenus : IEntity
    {
        public string Id { get; set; }

        public string RoleId { get; set; }
        public string MenuId { get; set; }
    }
}
