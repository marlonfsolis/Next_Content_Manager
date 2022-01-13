using ContentManager.API.Constants;
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace ContentManager.API.DAL
{
    public class AppDAL
    {
        public ConnectionString ConnectionString { get; }

        public AppDAL(ConnectionString connectionString)
        {
            ConnectionString = connectionString;
        }

        public async Task<int> ErrorLog_Write(string errorMessage, string errorDetail = "", string stackTrace = "")
        {
            var errorCode = 0;
            var errorLogId = 0;

            var dbPath = ConnectionString.ContentManagerDB;
            using (var conn = new SqlConnection(dbPath))
            {
                var dynParams = new DynamicParameters();
                dynParams.Add("@errorMessage", errorMessage);
                dynParams.Add("@errorDetail", errorDetail);
                dynParams.Add("@stackTrace", stackTrace);
                dynParams.Add("@errorCode", errorCode, direction: ParameterDirection.Output);
                dynParams.Add("@errorLogId", errorLogId, direction: ParameterDirection.Output);

                var sql = "sp_ErrorLog_Write";
                var result = await conn
                    .ExecuteAsync(sql, dynParams, commandType: CommandType.StoredProcedure);

                errorCode = dynParams.Get<int>("@errorCode");
                errorLogId = dynParams.Get<int>("@errorLogId");
            }

            return errorLogId;
        }
    }
}
