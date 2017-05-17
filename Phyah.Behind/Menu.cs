using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Behind.Entities
{
    public class Menu : IEntityConvert<Sys_Menu>
    {
        public string Id { get; set; }
        public string Icon { get; set; }
        public string Href { get; set; }
        public string Name { get; set; }
        public string Parent { get; set; }
        public Sys_Menu Convert()
        {
            return new Sys_Menu()
            {
                Id = Id,
                Icon = Icon,
                Href = Href,
                ParentId = Parent,
                Name = Name
            };
        }
    }
}
