using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Behind.Entities
{
    public class Role : IEntity
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public int? IsSuper { get; set; }
        public int? IsGroup { get; set; }
        public int? GroupId { get; set; }
    }
}
