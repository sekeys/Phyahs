using Phyah.Collection;
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

namespace Phyah.EventHub
{
    public class StoreQueue<T> : IQueue<T>,IEnumerable<T>,IEnumerator<T>
    {
        public int Count => throw new NotImplementedException();

        public bool IsEmpty => throw new NotImplementedException();

        public T Current => throw new NotImplementedException();

        object IEnumerator.Current => throw new NotImplementedException();

        public void Clear()
        {
            throw new NotImplementedException();
        }

        public T Dequeue()
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public void Enqueue(T item)
        {
            throw new NotImplementedException();
        }

        public IEnumerator<T> GetEnumerator()
        {
            throw new NotImplementedException();
        }

        public bool MoveNext()
        {
            throw new NotImplementedException();
        }

        public T Peek()
        {
            throw new NotImplementedException();
        }

        public void Reset()
        {
            throw new NotImplementedException();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            throw new NotImplementedException();
        }
    }
}
