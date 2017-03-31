using Phyah.Chain;
using System;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            Chain.Links(() =>
            {
                Console.WriteLine("Hello World!");
            }).Link((t) => {
                Console.WriteLine(t);
            }, 1).Run();
            Console.WriteLine("Hello World!");
            Console.Read();
        }
    }
}