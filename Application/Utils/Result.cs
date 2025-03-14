using System;

namespace Application.Utils;

public class Result<T>
{
    public T? Data { get; set; }
    public bool IsSuccess { get; set; }
    public string? ErrorMessage { get; set; }
    public int StatusCode { get; set; }

    public static Result<T> Success(T data) => new Result<T>()
    {
        Data = data,
        IsSuccess = true,
    };

    public static Result<T> Fail(string errorMessage, int statusCode) => new Result<T>()
    {
        IsSuccess = false,
        ErrorMessage = errorMessage,
        StatusCode = statusCode,
    };
}
