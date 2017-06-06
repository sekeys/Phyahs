﻿using Phyah.Enumerable;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Phyah.Web.Router
{
    public class BehaviorModel
    {
        private Dictionary<string, string> RouteValues;
        private List<IFilter> Filters;

        public BehaviorModel(
              TypeInfo type,
              IReadOnlyList<object> attributes)
        {
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            if (attributes == null)
            {
                throw new ArgumentNullException(nameof(attributes));
            }
            Type = type;

            Attributes = new List<object>(attributes);
            Parameters = new List<ParameterModel>();
            RouteValues = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            Filters = new List<IFilter>();
            Properties = new Dictionary<object, object>();
        }

        public TypeInfo Type { get; set; }
        public IReadOnlyList<ParameterModel> Parameters { get; set; }
        public IReadOnlyList<object> Attributes { get; set; }
        public Verbs Verb { get; set; }

        public string Template { get; set; }
        public string Name { get; set; }
        public Dictionary<object, object> Properties { get; private set; }
    }
}
