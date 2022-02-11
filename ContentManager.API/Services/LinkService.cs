using ContentManager.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;

namespace ContentManager.API.Services
{
    public class LinkService
    {
        public IActionContextAccessor ActionContextAccessor { get; }
        public IUrlHelperFactory UrlHelperFactory { get; }
        public IUrlHelper? UrlHelper { get; private set; }

        public LinkService(
            IActionContextAccessor actionContextAccessor,
            IUrlHelperFactory urlHelperFactory)
        {
            ActionContextAccessor = actionContextAccessor;
            UrlHelperFactory = urlHelperFactory;
            if (ActionContextAccessor.ActionContext != null)
            {
                UrlHelper = UrlHelperFactory.GetUrlHelper(ActionContextAccessor.ActionContext);
            }
        }

        public void GenLink(
            string routeName, 
            IResourceBase? resource = null, 
            Dictionary<string,object>? routeValues = null)
        {
            if (routeValues == null)
            {
                routeValues = new Dictionary<string, object>();
            }

            var url = UrlHelper?.Link(routeName, routeValues);
            if (url != null && resource != null)
            {
                resource.Link = url;
            }
        }

        public string GenLink(string routeName, Dictionary<string, object>? routeValues = null)
        {
            if (routeValues == null)
            {
                routeValues = new Dictionary<string, object>();
            }

            var url = UrlHelper?.Link(routeName, routeValues);
            return url != null ? url : String.Empty;
        }
    }
}
