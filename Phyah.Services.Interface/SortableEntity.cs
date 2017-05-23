using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Phyah.Services.Interface
{
    public class SortableEntity : IEntity
    {
        public string Id { get ; set ; }
        public int Sort { get; set; }
    }
}