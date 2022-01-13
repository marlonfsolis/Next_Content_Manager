using ContentManager.API.DAL;
using ContentManager.API.Models;
using ContentManager.API.ResourceParameters;

namespace ContentManager.API.Services
{
    public class ResourcesService
    {
        public ResourcesDAL ResourcesDAL { get; }

        public ResourcesService(ResourcesDAL resourcesDAL)
        {
            ResourcesDAL = resourcesDAL;
        }

        public async Task<Tuple<Error?, IList<Resources>>> GetResources(ResourcesRP resourcesRP)
        {
            var tuple = await ResourcesDAL.GetResources(resourcesRP);
            var error = tuple.Item1;
            var authors = tuple.Item2;

            switch (error?.Code)
            {
                case 1:
                    error = new Error(StatusCodes.Status500InternalServerError, error.ErrorLogId, "Database error on sp_Resource_ReadList");
                    break;
            }

            return new Tuple<Error?, IList<Resources>>(error, authors);
        }
    }
}
