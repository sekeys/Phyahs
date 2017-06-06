using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.Web.Router
{
    public interface IActionSelector
    {

        IReadOnlyList<object> SelectCandidates(RouteContext context);
        object SelectBestCandidate(RouteContext context, IReadOnlyList<object> candidates);
    }
}
