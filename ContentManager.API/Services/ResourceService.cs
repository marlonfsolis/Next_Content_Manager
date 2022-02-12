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

            switch (error?.Code)
            {
                case "500":
                    error.SetErrorResponseValues(StatusCodes.Status500InternalServerError, "Database error on sp_Resource_ReadList");
                    break;
                case "401":
                    error.SetErrorResponseValues(StatusCodes.Status400BadRequest, "The params offsetRows and fetchRows cannot be negative.");
                    break;
                case "402":
                    error.SetErrorResponseValues(StatusCodes.Status400BadRequest, "The filterJson param is not a valid JSON.");
                    break;
                case "403":
                    error.SetErrorResponseValues(StatusCodes.Status400BadRequest, "The searchJson param is not a valid JSON.");
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
                    error.SetErrorResponseValues(StatusCodes.Status400BadRequest, "ResourceId IS NULL");
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
                    var title = resource?.Title;
                    error.SetErrorResponseValues(StatusCodes.Status400BadRequest, "Resource already exist with this title", title);
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
                    error.SetErrorResponseValues(StatusCodes.Status400BadRequest, "Resource not found");
                    break;
            }

            return new Tuple<Error?, Resource?>(error, resource);
        }
    }
}
