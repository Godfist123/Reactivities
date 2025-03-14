using System;
using Application.Activities.Commands;
using Application.Activities.DTO;
using FluentValidation;

namespace Application.Activities.Validator;

public class EditActivityValidator
: BaseActivityValidator<EditActivity.Command, EditActivityDto>
{
    public EditActivityValidator() : base(x => x.Activity)
    {
        RuleFor(x => x.Activity.Id).NotEmpty().WithMessage("Id is required");
    }
}

