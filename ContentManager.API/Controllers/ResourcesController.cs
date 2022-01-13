using ContentManager.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContentManager.API.Controllers
{
    public class ResourcesController : ControllerBase
    {
        public ResourcesService ResourcesService { get; }

        public ResourcesController(ResourcesService resourcesService)
        {
            ResourcesService = resourcesService;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
