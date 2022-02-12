namespace ContentManager.API.Models
{
    public class Error
    {
        public string Code { get; set; }
        public int StatusCode { get; set; } = 200;
        public int ErrorLogId { get; set; }
        public string Message { get; set; }
        public object? Value { get; set; }

        public Error(string code, int errorLogId = 0, string message = "", object? value = null)
        {
            Code = code;
            ErrorLogId = errorLogId;
            Message = message;
            Value = value;
        }

        public Error(int statusCode, int errorLogId = 0, string message = "", object? value = null)
        {
            Code = "";
            StatusCode = statusCode;
            ErrorLogId = errorLogId;
            Message = message;
            Value = value;
        }

        public void SetErrorResponseValues(int statusCode, string message = "", object? value = null)
        {
            StatusCode = statusCode;
            Message = message;
            Value= value;
        }
    }
}
