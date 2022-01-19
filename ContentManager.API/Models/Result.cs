namespace ContentManager.API.Models
{
    public class Result<T> : IResourceBase
    {
        public T? Data { get; set; }
        public string? Link { get; set; }
        public Error? Error { get; set; }

        public Result(string link)
        {
            Link = link;
        }

        public Result(T data)
        {
            Data = data;
        }
        public Result(T data, Error? error)
        {
            Data = data;
            Error = error;
        }

        public Result(T data, Error error, string link)
        {
            Data = data;
            Error = error;
            Link = link;
        }

    }
}
