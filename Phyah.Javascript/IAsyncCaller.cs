using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Javascript
{
    public interface IAsyncCaller
    {
        JavascriptWaiter Execute();
    }
}
