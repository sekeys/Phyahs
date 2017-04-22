

namespace Phyah.Web
{
    using Phyah.Concurrency;
    using Phyah.Web.Handler;
    using System;
    using System.Collections.Generic;
    using System.Text;
    public class Initialization
    {
        public static Phyah.Concurrency.IPipeline Pipeline { get; private set; }
        public static void Initialize()
        {
            //Zonic.Process.ProcessorMappingFactory.Factory.Register(new DefaultProcessMapping());
            Phyah.Web.BehaviorFactory.Register(new DefaultBehaviorFactory());
            //Zonic.Process.Processor.Instanc
        }
        public static void InitializePipeline(IPipeline pipeline)
        {
            Pipeline = pipeline;
        }
    }

}
