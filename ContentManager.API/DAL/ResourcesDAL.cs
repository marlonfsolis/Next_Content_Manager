using ContentManager.API.Constants;
using ContentManager.API.Models;
using ContentManager.API.ResourceParameters;
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace ContentManager.API.DAL
{
    public class ResourcesDAL
    {
        private readonly ConnectionString ConnectionString;

        public ResourcesDAL(ConnectionString connectionString)
        {
            ConnectionString = connectionString;
        }

        public async Task<Tuple<Error?, IList<Resources>>> GetResources(ResourcesRP resourcesRP)
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
                    .QueryAsync<Resources>(sql, dynParams, commandType: CommandType.StoredProcedure);

                errorCode = dynParams.Get<int>("@errorCode");
                errorLogId = dynParams.Get<int>("@errorLogId");
                if (errorCode > 0)
                {
                    error = new Error(errorCode, errorLogId);
                }

                return new Tuple<Error?, IList<Resources>>(error, result.ToList());
            }
        }
    }
}
