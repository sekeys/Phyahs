

using System;
using System.Threading.Tasks;

namespace Phyah.EventHub
{
    public abstract class EventHub : IEventHub
    {

        public abstract void Broadcast(string eventName, IEvent evnt);

        public abstract void Broadcast<T>(string eventName, IEvent evnt);

        public void Broadcast<T>(IEvent evnt) where T : IReceptor => Broadcast(typeof(T), evnt);

        public void Broadcast(Type type, IEvent evnt)
        {
            throw new NotImplementedException();
        }

        public Task BroadcastAsync(string eventName, IEvent evnt)
        {
            throw new NotImplementedException();
        }

        public Task BroadcastAsync(Type type, IEvent evnt)
        {
            throw new NotImplementedException();
        }

        public Task BroadcastAsync<T>(IEvent evnt)
        {
            throw new NotImplementedException();
        }

        public void Subject(IReceptor receptor)
        {
            throw new NotImplementedException();
        }

        public void Subject<T>() where T : IReceptor
        {
            throw new NotImplementedException();
        }

        public void Subject(string eventName, IReceptor receptor)
        {
            throw new NotImplementedException();
        }
    }
}