namespace ContentManager.API.Models
{
    public class ErrorLog
    {
        public string? ErrorMessage { get; set; }
        public string? ErrorDetail { get; set; }
        public string? StackTrace { get; set; }
        public DateTime ErrorDate { get; set; }
    }
}
