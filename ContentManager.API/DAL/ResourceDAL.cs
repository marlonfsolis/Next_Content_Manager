using ContentManager.API.Constants;
using ContentManager.API.Models;
using ContentManager.API.ResourceParameters;
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace ContentManager.API.DAL
{
    public class ResourceDAL
    {
        private readonly ConnectionString ConnectionString;

        public ResourceDAL(ConnectionString connectionString)
        {
            ConnectionString = connectionString;
        }

        public async Task<Tuple<Error?, IList<Resource>>> GetResources(ResourceRP resourcesRP)
        {
            var errorCode = "";
            var errorLogId = 0;
            Error? error = null;

            var dbPath = ConnectionString.ContentManagerDB;
            using (var conn = new SqlConnection(dbPath))
            {
                var dynParams = new DynamicParameters();
                dynParams.Add("@offsetRows", resourcesRP.Offset);
                dynParams.Add("@fetchRows", resourcesRP.Fetch);
                dynParams.Add("@filterJson", resourcesRP.Filter);
                dynParams.Add("@searchJson", resourcesRP.SearchQuery);
                dynParams.Add("@errorCode", errorCode, direction: ParameterDirection.Output);
                dynParams.Add("@errorLogId", errorLogId, direction: ParameterDirection.Output);

                var sql = "sp_Resource_ReadList";
                var result = await conn
                    .QueryAsync<Resource>(sql, dynParams, commandType: CommandType.StoredProcedure);

                errorCode = dynParams.Get<string>("@errorCode");
                errorLogId = dynParams.Get<int>("@errorLogId");
                if (errorCode != "")
                {
                    error = new Error(errorCode, errorLogId);
                }

                return new Tuple<Error?, IList<Resource>>(error, result.ToList());
            }
        }

        public async Task<Tuple<Error?, Resource?>> GetResource(int resourceId)
        {
            var errorCode = "";
            var errorLogId = 0;
            Error? error = null;

            var dbPath = ConnectionString.ContentManagerDB;
            using (var conn = new SqlConnection(dbPath))
            {
                var dynParams = new DynamicParameters();
                dynParams.Add("@resourceId", resourceId);
                dynParams.Add("@errorCode", errorCode, direction: ParameterDirection.Output);
                dynParams.Add("@errorLogId", errorLogId, direction: ParameterDirection.Output);

                var sql = "sp_Resource_Read";
                var result = await conn
                    .QueryFirstOrDefaultAsync<Resource>(sql, dynParams, commandType: CommandType.StoredProcedure);

                errorCode = dynParams.Get<string>("@errorCode");
                errorLogId = dynParams.Get<int>("@errorLogId");
                if (errorCode != "")
                {
                    error = new Error(errorCode, errorLogId);
                }

                return new Tuple<Error?, Resource?>(error, result);
            }
        }

        public async Task<Tuple<Error?, Resource?>> CreateResource(CreateResourceRP createResourceRP)
        {
            var errorCode = "";
            var errorLogId = 0;
            Error? error = null;

            var r = createResourceRP;
            var dbPath = ConnectionString.ContentManagerDB;
            using (var conn = new SqlConnection(dbPath))
            {
                var p = new DynamicParameters();
                p.Add("@title", r.Title);
                p.Add("@description", r.Description);
                p.Add("@link", r.Resource_Link);
                p.Add("@imageUrl", r.ImageUrl);
                p.Add("@priority", r.Priority);
                p.Add("@timeToFinish", r.TimeToFinish);
                p.Add("@active", r.Active);
                p.Add("@createdAt", r.CreatedAt);
                p.Add("@errorCode", errorCode, direction: ParameterDirection.Output);
                p.Add("@errorLogId", errorLogId, direction: ParameterDirection.Output);

                var sql = "sp_Resource_Create";
                var result = await conn
                    .QueryFirstOrDefaultAsync<Resource>(sql, p, commandType: CommandType.StoredProcedure);

                errorCode = p.Get<string>("@errorCode");
                errorLogId = p.Get<int>("@errorLogId");
                if (errorCode != "")
                {
                    error = new Error(errorCode, errorLogId);
                }

                return new Tuple<Error?, Resource?>(error, result);
            }
        }

        public async Task<Tuple<Error?, Resource?>> DeleteResource(int resourceId)
        {
            var errorCode = "";
            var errorLogId = 0;
            Error? error = null;

            var dbPath = ConnectionString.ContentManagerDB;
            using (var conn = new SqlConnection(dbPath))
            {
                var dynParams = new DynamicParameters();
                dynParams.Add("@resourceId", resourceId);
                dynParams.Add("@errorCode", errorCode, direction: ParameterDirection.Output);
                dynParams.Add("@errorLogId", errorLogId, direction: ParameterDirection.Output);

                var sql = "sp_Resource_Delete";
                var result = await conn
                    .QueryFirstOrDefaultAsync<Resource>(sql, dynParams, commandType: CommandType.StoredProcedure);

                errorCode = dynParams.Get<string>("@errorCode");
                errorLogId = dynParams.Get<int>("@errorLogId");
                if (errorCode != "")
                {
                    error = new Error(errorCode, errorLogId);
                }

                return new Tuple<Error?, Resource?>(error, result);
            }
        }

        public async Task<Tuple<Error?, Resource?>> UpdateResource(UpdateResourceRP updateResourceRP)
        {
            var errorCode = "";
            var errorLogId = 0;
            Error? error = null;

            var r = updateResourceRP;
            var dbPath = ConnectionString.ContentManagerDB;
            using (var conn = new SqlConnection(dbPath))
            {
                var p = new DynamicParameters();
                p.Add("@resourceId", r.ResourceId);
                p.Add("@title", r.Title);
                p.Add("@description", r.Description);
                p.Add("@link", r.Resource_Link);
                p.Add("@imageUrl", r.ImageUrl);
                p.Add("@priority", r.Priority);
                p.Add("@timeToFinish", r.TimeToFinish);
                p.Add("@active", r.Active);
                p.Add("@createdAt", r.CreatedAt);
                p.Add("@errorCode", errorCode, direction: ParameterDirection.Output);
                p.Add("@errorLogId", errorLogId, direction: ParameterDirection.Output);

                var sql = "sp_Resource_Update";
                var result = await conn
                    .QueryFirstOrDefaultAsync<Resource>(sql, p, commandType: CommandType.StoredProcedure);

                errorCode = p.Get<string>("@errorCode");
                errorLogId = p.Get<int>("@errorLogId");
                if (errorCode != "")
                {
                    error = new Error(errorCode, errorLogId);
                }

                return new Tuple<Error?, Resource?>(error, result);
            }
        }
    }
}
