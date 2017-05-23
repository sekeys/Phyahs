using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Phyah.WebDataServices.Services
{
    public class Navigation
    {
        public string System { get; set; }
        public string Title { get; set; }
        public string Href { get; set; }
        public string Blank { get; set; }
        public int Sort { get; set; }
        public bool Disabled { get; set; }
    }
}