

namespace Phyah.Chain
{
    using Phyah.Collection;
    using Phyah.Interface;
    using System;

    public class Chain : IChain
    {
        public static IChain Links(IRunnable runnable)
        {
            return new Chain().Link(runnable);
        }
        public static IChain Links(Action action) => Links(new Runnable(action));

        public static IChain Links(Action<object> action, object state) => Links(new StateRunnable(action, state));

        public static IChain Links(Action<object, object> action, object context, object state) => Links(new StateWithContextRunnable(action, context, state));

        readonly IConcurrentQueue<IRunnable> Queue;
        public Chain()
        {
            Queue = new FriendlyConcurrentQueue<IRunnable>();
        }

        public void Run()
        {
            if (Queue.IsEmpty) { return; }
            IRunnable task = default(IRunnable);
            if (Queue.TryDequeue(out task))
            {
                while (task != null)
                {
                    task.Run();
                    Queue.TryDequeue(out task);
                }
            }
        }

        public IChain Link(IRunnable runnable)
        {
            Queue.TryEnqueue(runnable);
            return this;
        }

        public IChain Link(Action action) => Link(new Runnable(action));

        public IChain Link(Action<object> action,object state) => Link(new StateRunnable(action, state));

        public IChain Link(Action<object, object> action, object context, object state) => Link(new StateWithContextRunnable(action, context, state));

        //public void Link(Action<object, object, object> action, object obj3, object obj)
        //{
        //    throw new NotImplementedException();
        //}

        //public void Link(Action<object, object, object, object> action)
        //{
        //    throw new NotImplementedException();
        //}

        //public void Link(Action<object, object, object, object, object> action)
        //{
        //    throw new NotImplementedException();
        //}

        //public void Link(Action<object, object, object, object, object, object> action)
        //{
        //    throw new NotImplementedException();
        //}

        //public void Link(Action<object, object, object, object, object, object, object> action)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
