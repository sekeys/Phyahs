using System;
using System.Collections.Generic;
using System.Text;
using Phyah.Interface;

namespace Phyah.Concurrency
{
    public class ActionHandler : IHandler
    {
        readonly Action Action;
        public ActionHandler(Action action)
        {
            this.Action = action;
        }

        public IParameter Parameter => AbstractPipeline.Parameter;

        public void Handle()
        {
            Action.Invoke();
        }
    }
}
