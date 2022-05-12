using ContentManager.API.DAL;
using ContentManager.API.Models;
using ContentManager.API.ResourceParameters;

namespace ContentManager.API.Services
{
    public class ResourceService
    {
        public ResourceDAL ResourceDAL { get; }

        public ResourceService(ResourceDAL resourceDAL)
        {
            ResourceDAL = resourceDAL;
        }

        /// <summary>
        /// Return a list of resource objects.
        /// </summary>
        /// <param name="resourceRP">
        ///     int Offset
        ///     int Fetch
        ///     string? Filter
        ///     string? SearchQuery
        /// </param>
        /// <returns></returns>
        public async Task<Tuple<Error?, IList<Resource>>> GetResources(ResourceRP resourceRP)
        {
            var tuple = await ResourceDAL.GetResources(resourceRP);
            var error = tuple.Item1;
            var authors = tuple.Item2;
            object? value = null;

            switch (error?.Code)
            {
                case "500":
                    error.SetErrorResponseValues(StatusCodes.Status500InternalServerError, "Database error on sp_Resource_ReadList");
                    break;
                case "401":
                    value = new { Offset = resourceRP.Offset, Fetch = resourceRP.Fetch };
                    error.SetErrorResponseValues(StatusCodes.Status400BadRequest, "The params Offset and Fetch cannot be negative.", value);
                    break;
                case "402":
                    value = new { Filter = resourceRP.Filter };
                    error.SetErrorResponseValues(StatusCodes.Status400BadRequest, "The filterJson param is not a valid JSON.", value);
                    break;
                case "403":
                    value = new { SearchQuery = resourceRP.SearchQuery };
                    error.SetErrorResponseValues(StatusCodes.Status400BadRequest, "The searchJson param is not a valid JSON.", value);
                    break;
            }

            return new Tuple<Error?, IList<Resource>>(error, authors);
        }

        public async Task<Tuple<Error?, Resource?>> GetResource(int resourceId)
        {
            var tuple = await ResourceDAL.GetResource(resourceId);
            var error = tuple.Item1;
            var resource = tuple.Item2;

            switch (error?.Code)
            {
                case "500":
                    error.SetErrorResponseValues(StatusCodes.Status500InternalServerError, "Database error on sp_Resource_Read");
                    break;
                case "401":
                    var value = new { resourceId };
                    error.SetErrorResponseValues(StatusCodes.Status400BadRequest, "Resource not found", value);
                    break;
            }

            return new Tuple<Error?, Resource?>(error, resource);
        }

        public async Task<Tuple<Error?, Resource?>> CreateResource(CreateResourceRP createResourceRP)
        {
            var tuple = await ResourceDAL.CreateResource(createResourceRP);
            var error = tuple.Item1;
            var resource = tuple.Item2;

            switch (error?.Code)
            {
                case "500":
                    error.SetErrorResponseValues(StatusCodes.Status500InternalServerError, "Database error on sp_Resource_Create");
                    break;
                case "401":
                    var value = new { title = createResourceRP.Title };
                    error.SetErrorResponseValues(StatusCodes.Status400BadRequest, "Resource already exist with this title", value);
                    break;
            }

            return new Tuple<Error?, Resource?>(error, resource);
        }

        public async Task<Tuple<Error?, Resource?>> DeleteResource(int resourceId)
        {
            var tuple = await ResourceDAL.DeleteResource(resourceId);
            var error = tuple.Item1;
            var resource = tuple.Item2;

            switch (error?.Code)
            {
                case "500":
                    error.SetErrorResponseValues(StatusCodes.Status500InternalServerError, "Database error on sp_Resource_Delete");
                    break;
                case "401":
                    var value = new { resourceId };
                    error.SetErrorResponseValues(StatusCodes.Status400BadRequest, "Resource not found", value);
                    break;
            }

            return new Tuple<Error?, Resource?>(error, resource);
        }

        public async Task<Tuple<Error?, Resource?>> UpdateResource(UpdateResourceRP updateResourceRP)
        {
            var tuple = await ResourceDAL.UpdateResource(updateResourceRP);
            var error = tuple.Item1;
            var resource = tuple.Item2;

            switch (error?.Code)
            {
                case "500":
                    error.SetErrorResponseValues(StatusCodes.Status500InternalServerError, "Database error on sp_Resource_Update");
                    break;
                case "401":
                    var value = new { title = updateResourceRP.Title };
                    error.SetErrorResponseValues(StatusCodes.Status400BadRequest, "Resource already exist with this title", value);
                    break;
            }

            return new Tuple<Error?, Resource?>(error, resource);
        }
    }
}
