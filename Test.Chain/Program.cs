using Phyah.Chain;
using System;
using System.Threading;

namespace Test
{
    class Program
    {
        static  void Main(string[] args)
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
            Console.WriteLine("Hello World!");
            Console.Read();
        }
    }
}