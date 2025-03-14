using System;

namespace Application.Utils.Exceptions;

public class AppException(int StatusCode, string Message, string? Traces)
{
    public int StatusCode { get; } = StatusCode;
    public string Message { get; } = Message;
    public string? Traces { get; } = Traces;


}
