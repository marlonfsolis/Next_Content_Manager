using ContentManager.API.Models;

namespace ContentManager.API.ResourceParameters
{
    public class CreateResourceRP : IResourceBase
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string Resource_Link { get; set; } = "";
        public string ImageUrl { get; set; } = "";
        public int Priority { get; set; }
        public int TimeToFinish { get; set; }
        public bool Active { get; set; } = true;
        public DateTime CreatedAt { get; set; }

        public string Link { get; set; } = "";
    }
}
