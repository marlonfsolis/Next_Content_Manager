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
                case 1:
                    error = new Error(StatusCodes.Status500InternalServerError, error.ErrorLogId, "Database error on sp_Resource_ReadList");
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
                case 1:
                    error = new Error(StatusCodes.Status500InternalServerError, error.ErrorLogId, "Database error on sp_Resource_Read");
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
                case 1:
                    error = new Error(StatusCodes.Status500InternalServerError, error.ErrorLogId, "Database error on sp_Resource_Create");
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
                case 1:
                    error = new Error(StatusCodes.Status500InternalServerError, error.ErrorLogId, "Database error on sp_Resource_Delete");
                    break;
            }

            return new Tuple<Error?, Resource?>(error, resource);
        }
    }
}
