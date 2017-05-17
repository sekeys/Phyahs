using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Behind.Entities
{
    public class MenuTree:Menu
    {

        public List<Menu> Children { get; set; }

        public MenuTree()
        {
            Children = new List<Menu>();
        }
    }
}
