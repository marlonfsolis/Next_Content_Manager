namespace ContentManager.API.Constants
{
    public class ConnectionString
    {
        public IConfiguration Configuration { get; }

        public ConnectionString(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public string ContentManagerDB => Configuration.GetValue<string>("ConnectionStrings:ContentManagerSql");
    }
}
