using ContentManager.API.Models;
using ContentManager.API.ResourceParameters;
using ContentManager.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContentManager.API.Controllers
{
    [ApiController]
    [Route("api/resources")]
    public class ResourcesController : ControllerBase
    {
        public ResourcesService ResourcesService { get; }
        public LinkService LinkService { get; }

        public ResourcesController(
            ResourcesService resourcesService, 
            LinkService linkService)
        {
            ResourcesService = resourcesService;
            LinkService = linkService;
        }

        [HttpGet]
        [HttpHead]
        [Route("", Name = "GetResources")]
        public async Task<ActionResult<Result<IList<Resources>>>> GetResources(
            [FromQuery] ResourcesRP resourcesRP)
        {
            var tuple = await ResourcesService.GetResources(resourcesRP);
            var error = tuple.Item1;
            var resources = tuple.Item2;

            var result = new Result<IList<Resources>>(resources, error);
            LinkService.GenLink("getAuthors", result);

            if (error != null)
            {
                return StatusCode(error.Code, result);
            }

            // generate link for each resource
            foreach (var resource in resources)
            {
                LinkService.GenLink("GetResources", resource, new { resourceId = resource.ResourceId });
            }

            return Ok(result);
        }
    }
}
