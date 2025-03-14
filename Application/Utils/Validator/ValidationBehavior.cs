using System;
using FluentValidation;
using MediatR;

namespace Application.Validator;

public class ValidationBehavior<Trequest, Tresponse>(IValidator<Trequest>? validator = null)
: IPipelineBehavior<Trequest, Tresponse> where Trequest : notnull
{
    public async Task<Tresponse> Handle(Trequest request, RequestHandlerDelegate<Tresponse> next, CancellationToken cancellationToken)
    {
        if (validator == null)
            return await next();

        var validationRes = await validator.ValidateAsync(request, cancellationToken);
        if (validationRes.IsValid)
            return await next();

        throw new ValidationException(validationRes.Errors);
    }
}
