namespace ContentManager.API.ResourceParameters
{
    public class ResourceRP : IResourcesParameters
    {
        public int Offset { get; set; }
        public int Fetch { get; set; }
        public string Filter { get; set; } = "";
        public string SearchQuery { get; set; } = "";
    }
}
