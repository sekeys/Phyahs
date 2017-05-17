using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Behind.Entities
{
    public class Sys_Menu : IEntity
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Href { get; set; }
        public DateTime CreatedTime { get; set; }
        public string Icon { get; set; }
        public string ParentId { get; set; }
        public int? IsValid { get; set; }
    }
}
