using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Behind.Entities
{
    public interface IEntityConvert<T>
    {
       T Convert();
    }
}
