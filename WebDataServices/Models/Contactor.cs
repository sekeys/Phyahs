using Phyah.Services.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.WebDataServices.Services
{
    public class Contactor : IEntity
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Remark { get; set; }
        public string Information { get; set; }

        public string FormCode { get; set; }
        public DateTime SubmitDate { get; set; }
        public string System { get; set; }
    }
}
