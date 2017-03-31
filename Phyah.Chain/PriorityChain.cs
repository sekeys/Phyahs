﻿


namespace Phyah.Chain
{
    using System;
    using Phyah.Interface;
    using Phyah.Collection;
    public class PriorityChain : IPriorityChain
    {
        public PriorityChain()
        {

        }

        public static IChain Links(IRunnable runnable)
        {
            return new PriorityChain().Link(runnable);
        }
        public static IChain Links(Action action) => Links(new Runnable(action));

        public static IChain Links(Action<object> action, object state) => Links(new StateRunnable(action, state));

        public static IChain Links(Action<object, object> action, object context, object state) => Links(new StateWithContextRunnable(action, context, state));


        public static IChain Links(IRunnable runnable,int priority)
        {
            return new PriorityChain().Link(runnable, priority);
        }
        public static IChain Links(Action action, int priority) => Links(new PriorityActionRunnable(action,priority));

        public static IChain Links(Action<object> action, object state, int priority) => Links(new PriorityStateRunnable(action, state, priority));

        public static IChain Links(Action<object, object> action, object context, object state, int priority) => Links(new PriorityStateWithContextRunnable(action, context, state, priority));


        readonly IConcurrentQueue<IPriorityRunnable> Queue;
        public IChain Link(IRunnable runnable, int priority)
        {
            if (runnable is PriorityRunnable)
            {

                Queue.TryEnqueue((PriorityRunnable)runnable);
            }
            else
            {
                Queue.TryEnqueue(new PriorityRunnable(runnable, priority));
            }
            return this;
        }

        public IChain Link(Action action, int priority)
        {
            Queue.TryEnqueue(new PriorityActionRunnable(action, priority));
            return this;
        }

        public IChain Link(Action<object> action, object state, int priority)
        {
            Queue.TryEnqueue(new PriorityStateRunnable(action, state, priority));
            return this;
        }

        public IChain Link(Action<object, object> action, object context, object state, int priority)
        {
            Queue.TryEnqueue(new PriorityStateWithContextRunnable(action,context, state, priority));
            return this;
        }

        public IChain Link(IRunnable runnable)
        {
            return Link(runnable, 0);
        }

        public IChain Link(Action action)
        {
            return Link(action, 0);
        }

        public IChain Link(Action<object> action, object state)
        {
           return Link(action, state, 0);
        }

        public IChain Link(Action<object, object> action, object context, object state)
        {
           return Link(action, context, state,0);
        }

        public void Run()
        {
            if (Queue.IsEmpty) { return; }
            IPriorityRunnable task = default(IPriorityRunnable);
            if (Queue.TryDequeue(out task))
            {
                while (task != null)
                {
                    task.Run();
                    Queue.TryDequeue(out task);
                }
            }
        }
    }
}
