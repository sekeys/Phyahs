using Phyah.Services.Interface;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Phyah.WebDataServices.Services
{
    public class Article: SortableEntity
    {
        public string System { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public DateTime PublishDate { get; set; }
        public string Publisher { get; set; }
        public string Content { get; set; }
        public string Quotes { get; set; }
        public string Author { get; set; }
    }
}