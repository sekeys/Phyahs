using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Phyah.Web.Router
{
    public class ParameterModel
    {
        //public ActionModel Action { get; set; }

        public IReadOnlyList<object> Attributes { get; }

        public IDictionary<object, object> Properties { get; }

        MemberInfo MemberInfo => ParameterInfo.Member;

        string Name => ParameterName;

        public ParameterInfo ParameterInfo { get; private set; }

        public string ParameterName { get; set; }
        
    }
}
