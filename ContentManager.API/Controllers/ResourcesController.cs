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
        public ResourceService ResourceService { get; }
        public LinkService LinkService { get; }

        public ResourcesController(
            ResourceService resourcesService, 
            LinkService linkService)
        {
            ResourceService = resourcesService;
            LinkService = linkService;
        }

        [HttpGet]
        [HttpHead]
        [Route("", Name = "GetResources")]
        public async Task<ActionResult<Result<IList<Resource>>>> GetResources(
            [FromQuery] ResourceRP resourcesRP)
        {
            var tuple = await ResourceService.GetResources(resourcesRP);
            var error = tuple.Item1;
            var resources = tuple.Item2;

            var result = new Result<IList<Resource>>(resources, error);
            LinkService.GenLink("GetResources", result);

            if (error != null)
            {
                return StatusCode(error.Code, result);
            }

            // generate link for each resource
            foreach (var resource in resources)
            {
                var routeValues = new Dictionary<string, object>()
                {
                    { "resourceId", resource.ResourceId }
                };
                LinkService.GenLink("GetResources", resource, routeValues);
            }

            return Ok(result);
        }

        [HttpGet]
        [HttpHead]
        [Route("{resourceId}", Name = "GetResource")]
        public async Task<ActionResult<Result<Resource>>> GetResource([FromRoute] int resourceId)
        {
            var tuple = await ResourceService.GetResource(resourceId);
            var error = tuple.Item1;
            var resource = tuple.Item2;

            var result = new Result<Resource?>(resource, error);
            var routeValues = new Dictionary<string, object>()
            {
                { "resourceId", resourceId }
            };
            LinkService.GenLink("GetResource", result, routeValues);

            if (error != null)
            {
                return StatusCode(error.Code, result);
            }

            return Ok(result);
        }

        [HttpPost]
        [Route("", Name = "CreateResource")]
        public async Task<ActionResult<Result<Resource>>> CreateResource([FromBody] CreateResourceRP createResourceRP)
        {
            var tuple = await ResourceService.CreateResource(createResourceRP);
            var error = tuple.Item1;
            var resource = tuple.Item2;

            var result = new Result<Resource?>(resource, error);
            LinkService.GenLink("CreateResource", result);

            if (error != null)
            {
                return StatusCode(error.Code, result);
            }

            var routeValues = new Dictionary<string, object>()
            {
                { "resourceId", resource != null ? resource.ResourceId : 0 }
            };
            LinkService.GenLink("GetResource", resource, routeValues);

            return Ok(result);
        }

        [HttpDelete]
        [Route("{resourceId}", Name = "DeleteResource")]
        public async Task<ActionResult<Result<Resource>>> DeleteResource([FromRoute] int resourceId)
        {
            var tuple = await ResourceService.DeleteResource(resourceId);
            var error = tuple.Item1;
            var resource = tuple.Item2;

            var result = new Result<Resource?>(resource, error);
            var routeValues = new Dictionary<string, object>()
            {
                { "resourceId", resourceId }
            };
            LinkService.GenLink("GetResource", result, routeValues);

            if (error != null)
            {
                return StatusCode(error.Code, result);
            }


            LinkService.GenLink("GetResource", resource, routeValues);

            return Ok(result);
        }
    }
}
