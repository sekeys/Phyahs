using Phyah.Chain;
using Phyah.Concurrency;
using System;
using System.Threading;

namespace Test
{

    class Program
    {
        static void Main(string[] args)
        {
            //new AccessorContextTest().TestAccCtx();

            //new DefaultPipeline(() => { }, () => { }, (ex) => { }).AddLast(new ActionHandler(() =>
            //{
            //    Console.WriteLine(Thread.CurrentThread.ManagedThreadId);
            //    Thread.Sleep(1000);
            //})).AddLast(new ActionHandler(() =>
            //{
            //    Console.WriteLine("t" + Thread.CurrentThread.ManagedThreadId);
            //})).AddFirst(new ActionHandler(() =>
            //{
            //    Console.WriteLine("F" + Thread.CurrentThread.ManagedThreadId);
            //})).Start();
            Test();
            Console.Read();
        }

        static void Test()
        {

            var ac = AsyncChain.Links(() =>
            {
                Console.WriteLine("Hellow World11");

            });
            ac.Link(() =>
            {

                Console.WriteLine("Hellow World22");

            }).Link(() =>
            {
                Console.WriteLine("Hellow World2333");

            }).CancelAsync().Link(() =>
            {
                Console.WriteLine("Hellow World666");

            }).Link(() =>
            {
                Console.WriteLine("Hellow World4444");

            }).Link(() =>
            {
                Console.WriteLine("Hellow World4555");

            });
        }
    }
}