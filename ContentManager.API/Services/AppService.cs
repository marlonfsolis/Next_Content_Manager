using ContentManager.API.DAL;

namespace ContentManager.API.Services
{
    public class AppService
    {
        public AppDAL AppDAL { get; }

        public AppService(AppDAL appDAL)
        {
            AppDAL = appDAL;
        }

        public async Task<int> ErrorLog_Write(string errorMessage, string errorDetail = "", string stackTrace = "")
        {
            var result = await AppDAL.ErrorLog_Write(errorMessage, errorDetail, stackTrace);

            return result;
        }
    }
}
