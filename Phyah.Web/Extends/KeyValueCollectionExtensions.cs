

namespace Phyah.Web
{
    using Microsoft.Extensions.Primitives;
    using System;
    using System.Collections.Generic;
    using System.Reflection;
    public static class KeyValueCollectionExtensions
    {
        public static T Serialized<T>(this IEnumerable<KeyValuePair<string, StringValues>> pairs)
        {
            return (T)Serialized(pairs,typeof(T));
        }
        public static object Serialized(this IEnumerable<KeyValuePair<string, StringValues>> pairs, Type type)
        {
            object obj = Activator.CreateInstance(type);
            TypeInfo ti = type.GetTypeInfo();
            foreach(var keyvalue in pairs)
            {
                var pro = ti.GetProperty(keyvalue.Key, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.SetProperty);
                pro.SetValue(obj, keyvalue.Value.ToString());
            }
            return obj;
        }
    }
}
