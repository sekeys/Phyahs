using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Concurrency
{
    public class StaticPipeline : AbstractPipeline
    {
        readonly Action<Exception> OnException;
        readonly Action OnCompleted;
        readonly Action OnCancel;
        const string STATICPIPELINEDEFAULTEXECUTOR = "STATICPIPELINE.DEFAULTEXECUTOR";
        readonly Func<IExecutor> ExecutorFactory = () => new IndependentThreadExecutor(null, STATICPIPELINEDEFAULTEXECUTOR, TimeSpan.Zero);
        //new ThreadDisposedExecutor(() =>
        //{
        //    AccessorContext.DefaultContext.Remove(STATICPIPELINEDEFAULTEXECUTOR) ;
        //});

        static object Locker = new object();
        protected override IExecutor DefaultExecutor
        {
            get
            {
                var executor = AccessorContext.DefaultContext.Get<IExecutor>(STATICPIPELINEDEFAULTEXECUTOR);
                if (executor == null)
                {
                    lock (this)
                    {
                        executor = ExecutorFactory();
                        AccessorContext.DefaultContext.Set<IExecutor>(STATICPIPELINEDEFAULTEXECUTOR, executor);
                    }
                }
                return executor;
                //return null;
            }
        }
        public StaticPipeline(Action completed, Action cancel, Action<Exception> exception)
        {
            OnException = exception;
            OnCompleted = completed;
            OnCancel = cancel;
        }
        public override void ExceptionCaught(Exception ex)
        {
            //System.Threading.Tasks.Task.Run(() =>
            //{
            //    DefaultExecutor.ShutdownGracefullyAsync().Wait();
            //});
            State = PipelineState.Exception;
            OnException(ex);
            TerminationCompletionSource.TrySetException(ex);
        }
        public override void Start()
        {
            var term = new TaskCompletionSource();
            try
            {
                AccessorContext.DefaultContext.Set<TaskCompletionSource>(TERMINATIONCOMPLETIONSOURCENAME, term);
                State = PipelineState.Running;
                this.StartCore(DefaultExecutor);
            }
            catch (Exception ex)
            {
                term.SetException(ex);
            }
        }

        public override void Next(IHandlerContext context)
        {
            try
            {
                lock (this)
                {
                    if (PipelineState.Running == State
                        || PipelineState.Unstarted == State
                        )
                    {
                        if (DefaultExecutor.InLoop)
                        {
                            var handler = context.Next();
                            if (handler == null)
                                Completed();
                            handler.Handle(DefaultExecutor);
                        }
                        else
                        {
                            DefaultExecutor.Execute(() =>
                            {
                                var handler = context.Next();
                                if (handler == null)
                                    Completed();
                                handler.Handle(DefaultExecutor);
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ExceptionCaught(ex);
            }
        }
        //protected override void StartCore()
        //{

        //}
        public override PipelineState State
        {
            get => AccessorContext.DefaultContext.Get<PipelineState>();
            protected set => AccessorContext.DefaultContext.Set<PipelineState>(value);
        }

        readonly string TERMINATIONCOMPLETIONSOURCENAME = "STATICPIPELINE.TERMINATIONCOMPLETIONSOURCE";
        protected override TaskCompletionSource TerminationCompletionSource
        {

            get => AccessorContext.DefaultContext.Get<TaskCompletionSource>(TERMINATIONCOMPLETIONSOURCENAME);

        }
        public override void Completed()
        {
            State = PipelineState.Completed;
            OnCompleted();

            TerminationCompletionSource.Complete();
        }
        public override void Wait()
        {
            var executor = DefaultExecutor;
            executor.ShutdownGracefullyAsync(TimeSpan.Zero, TimeSpan.Zero).Wait();
            TerminationCompletionSource.Task.Wait();
            AccessorContext.DefaultContext.Set<IExecutor>(STATICPIPELINEDEFAULTEXECUTOR, null);
        }
        public override void Cancel()
        {
            State = PipelineState.Canceled;
            OnCancel();
            //DefaultExecutor.ShutdownGracefullyAsync().Wait();
            TerminationCompletionSource.SetCanceled();
        }

        static IPipeline _Static;
        public static IPipeline Static
        {
            get
            {
                return _Static;
            }
        }
        public static PipelineState PipelineState
        {
            get => AccessorContext.DefaultContext.Get<PipelineState>();
            protected set => AccessorContext.DefaultContext.Set<PipelineState>(value);
        }
        public static void Register(IPipeline pipeline)
        {
            _Static = pipeline;
        }
    }
}
