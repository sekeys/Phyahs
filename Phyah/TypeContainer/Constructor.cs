
namespace Phyah.TypeContainer
{
    using System;
    using System.Collections.Generic;
    using System.Reflection;
    using System.Linq;

    public class Constructor
    {
        public static object Construct(Type baseType)
        {
            Type type = TypeContainer.Container.Fetch(baseType);
            if (type == null)
            {
                type = baseType;
            }
            var constructors = type.GetTypeInfo().GetConstructors().OrderBy(m=>m.GetParameters().Length).ToArray();

            if (constructors.Length != 0)
            {
                var constructor = constructors[0];
                if (constructor != null)
                {
                    var paramters = constructor.GetParameters();
                    var obes = new object[paramters.Length];
                    var length = paramters.Length;
                    for (var i = 0; i < length; i++)
                    {
                        obes[i] = Construct(paramters[i].ParameterType);
                    }
                    return constructor.Invoke(obes);
                }
            }
            return default(object);
        }
        public static T Construct<T>()
        {
            return (T)Construct(typeof(T));
        }
    }
}
