using System;
using System.Collections.Generic;
using System.Text;

namespace Test
{
    using Phyah.Concurrency;
    using System.Threading;

    public class AccessorContextTest
    {
        public void TestAccCtx()
        {
            var actx = new AccessorContext();
            actx.Set(new TestData());

            new Thread(
                 new ThreadStart(ThreadStart)).Start();
        }
        void ThreadStart()
        {

            var ctx = AccessorContext.DefaultContext;
            Console.WriteLine(ctx == null ? "ctx=null" : "");
            var td = ctx.Get<TestData>();
            td.B++;
            Console.WriteLine(td.B);
            //Accessor
        }
    }
    public sealed class TestData
    {
        public int A;
        public int B = 1;
    }
}
