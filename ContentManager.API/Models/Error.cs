namespace ContentManager.API.Models
{
    public class Error
    {
        public int Code { get; set; }
        public int ErrorLogId { get; set; }
        public string Message { get; set; }
        public object Value { get; set; }

        public Error(int code, int errorLogId = 0, string message = "", object value = null)
        {
            Code = code;
            ErrorLogId = errorLogId;
            Message = message;
            Value = value;
        }
    }
}
