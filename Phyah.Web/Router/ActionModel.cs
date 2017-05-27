using Phyah.Enumerable;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Phyah.Web.Router
{
    public class ActionModel
    {
        public ActionModel(
              MethodInfo actionMethod,
              IReadOnlyList<object> attributes)
        {
            if (actionMethod == null)
            {
                throw new ArgumentNullException(nameof(actionMethod));
            }

            if (attributes == null)
            {
                throw new ArgumentNullException(nameof(attributes));
            }
            Method = actionMethod;
            
            Attributes = new List<object>(attributes);
            Parameters = new List<ParameterModel>();
            //RouteValues = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            Properties = new Dictionary<object, object>();
            //Selectors = new List<SelectorModel>();
        }

        public MethodInfo Method { get; set; }
        public IReadOnlyList< ParameterModel> Parameters { get; set; }
        public IReadOnlyList<object> Attributes { get; set; }
        public Verbs Verb { get; set; }

        public string Template { get; set; }
        public string Name { get; set; }
        public Dictionary<object, object> Properties { get; private set; }
    }
}
