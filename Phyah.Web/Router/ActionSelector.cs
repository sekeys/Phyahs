using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Web.Router
{
    public class ActionSelector : IActionSelector
    {
        private Cache Current
        {
            get
            {
                var actions = _actionDescriptorCollectionProvider.ActionDescriptors;
                var cache = Volatile.Read(ref _cache);

                if (cache != null && cache.Version == actions.Version)
                {
                    return cache;
                }

                cache = new Cache(actions);
                Volatile.Write(ref _cache, cache);
                return cache;
            }
        }
        public object SelectBestCandidate(RouteContext context, IReadOnlyList<object> candidates)
        {
            throw new NotImplementedException();
        }

        public IReadOnlyList<object> SelectCandidates(RouteContext context)
        {
            throw new NotImplementedException();
        }
    }
}
