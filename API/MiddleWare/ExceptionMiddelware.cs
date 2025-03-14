using System;
using System.Net;
using System.Text.Json;
using Application.Utils.Exceptions;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.MiddleWare;

public class ExceptionMiddelware(ILogger<ExceptionMiddelware> logger, IHostEnvironment host) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }

        catch (Exception ex)
        {

            await HandleException(context, ex);
        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        var resp = host.IsDevelopment()
        ? new AppException(StatusCodes.Status500InternalServerError, ex.Message, ex.StackTrace)
        : new AppException(StatusCodes.Status500InternalServerError, "Internal Server Error", null);
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        var json = JsonSerializer.Serialize(resp, options);
        await context.Response.WriteAsync(json);
    }

    private async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();
        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                if (validationErrors.TryGetValue(error.PropertyName, out string[]? value))
                {
                    validationErrors[error.PropertyName] = [.. value, error.ErrorMessage];
                }
                else
                {
                    validationErrors.Add(error.PropertyName, [error.ErrorMessage]);
                }
            }
        }

        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Title = "One or more validation errors occurred.",
            Status = StatusCodes.Status400BadRequest,
            Detail = "See the errors property for details.",
            Type = "validation_error",
        };
        await context.Response.WriteAsJsonAsync(validationProblemDetails);

    }
}
