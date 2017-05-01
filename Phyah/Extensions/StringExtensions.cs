using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Extensions
{
    public static class StringExtensions
    {
        public static int ToInt32(this string str)
        {
            return Convert.ToInt32(str);
        }
        public static short ToInt16(this string str)
        {
            return Convert.ToInt16(str);
        }
        public static long ToInt64(this string str)
        {
            return Convert.ToInt64(str);
        }

        public static int ToInt32(this string str, int value)
        {
            try
            {
                return Convert.ToInt32(str);
            }
            catch
            {
                return value;
            }
        }
        public static short ToInt16(this string str, short value)
        {
            try
            {
                return Convert.ToInt16(str);
            }
            catch
            {
                return value;
            }
        }
        public static long ToInt64(this string str, long value)
        {
            try
            {
                return Convert.ToInt64(str);
        }
            catch
            {
                return value;
            }
}

        public static bool ToBoolean(this string str)
        {
            return str.StartsWith("T", StringComparison.OrdinalIgnoreCase)||"1".Equals(str) ? true : false;
        }

    }
}
