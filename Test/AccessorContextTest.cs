using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Test
{
    using Phyah.Concurrency;
    using System.Threading;

    public class AccessorContextTest
    {
        [Fact]
        public void TestAccCtx()
        {
            var actx = new AccessorContext();
            actx.Set(new TestData());

            new Thread(
                 new ThreadStart(ThreadStart));
        }
        void ThreadStart()
        {
            var ctx = AccessorContext.DefaultContext;
            var td = ctx.Get<TestData>();
            //Accessor
        }
        sealed class TestData
        {
            public int A;
            public int B = 1;
        }
    }
}
