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
            var errorCode = 0;
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

                errorCode = dynParams.Get<int>("@errorCode");
                errorLogId = dynParams.Get<int>("@errorLogId");
                if (errorCode > 0)
                {
                    error = new Error(errorCode, errorLogId);
                }

                return new Tuple<Error?, IList<Resource>>(error, result.ToList());
            }
        }

        public async Task<Tuple<Error?, Resource?>> GetResource(int resourceId)
        {
            var errorCode = 0;
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

                errorCode = dynParams.Get<int>("@errorCode");
                errorLogId = dynParams.Get<int>("@errorLogId");
                if (errorCode > 0)
                {
                    error = new Error(errorCode, errorLogId);
                }

                return new Tuple<Error?, Resource?>(error, result);
            }
        }

        public async Task<Tuple<Error?, Resource?>> CreateResource(CreateResourceRP createResourceRP)
        {
            var errorCode = 0;
            var errorLogId = 0;
            Error? error = null;

            var dbPath = ConnectionString.ContentManagerDB;
            using (var conn = new SqlConnection(dbPath))
            {
                var dynParams = new DynamicParameters();
                dynParams.Add("@title", createResourceRP.Title);
                dynParams.Add("@description", createResourceRP.Description);
                dynParams.Add("@link", createResourceRP.Resource_Link);
                dynParams.Add("@imageUrl", createResourceRP.ImageUrl);
                dynParams.Add("@priority", createResourceRP.Priority);
                dynParams.Add("@timeToFinish", createResourceRP.TimeToFinish);
                dynParams.Add("@active", createResourceRP.Active);
                dynParams.Add("@createdAt", createResourceRP.CreatedAt);
                dynParams.Add("@errorCode", errorCode, direction: ParameterDirection.Output);
                dynParams.Add("@errorLogId", errorLogId, direction: ParameterDirection.Output);

                var sql = "sp_Resource_Create";
                var result = await conn
                    .QueryFirstOrDefaultAsync<Resource>(sql, dynParams, commandType: CommandType.StoredProcedure);

                errorCode = dynParams.Get<int>("@errorCode");
                errorLogId = dynParams.Get<int>("@errorLogId");
                if (errorCode > 0)
                {
                    error = new Error(errorCode, errorLogId);
                }

                return new Tuple<Error?, Resource?>(error, result);
            }
        }

        public async Task<Tuple<Error?, Resource?>> DeleteResource(int resourceId)
        {
            var errorCode = 0;
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

                errorCode = dynParams.Get<int>("@errorCode");
                errorLogId = dynParams.Get<int>("@errorLogId");
                if (errorCode > 0)
                {
                    error = new Error(errorCode, errorLogId);
                }

                return new Tuple<Error?, Resource?>(error, result);
            }
        }
    }
}
