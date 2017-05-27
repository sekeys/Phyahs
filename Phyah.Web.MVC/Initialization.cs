

namespace Phyah.Web.MVC
{
    using Phyah.Concurrency;
    using Phyah.Web.MVC.Handler;
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading;

    public class Initialization
    {
        public static Phyah.Concurrency.IPipeline Pipeline { get; private set; }
        public static void Initialize()
        {
            Thread.CurrentThread.Name = "Phyah.Master";
            
        }
        public static void InitializePipeline(IPipeline pipeline)
        {
            Pipeline = pipeline;
        }
    }

}
