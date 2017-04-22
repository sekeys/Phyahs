﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Concurrency
{
    public interface IHandlerContext
    {
        IExecutor Executor { get; }
        string Name { get; }
        IHandler Handler { get; }
        IEnumerable<Attribute> Attributes { get; }

        IPipeline Pipeline { get; }
        IHandlerContext Next();
        void Handle();

        void Completed();

        void ExceptionCaught(Exception ex);

        void Cancel();
        
    }
}
