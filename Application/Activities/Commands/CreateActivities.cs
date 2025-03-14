using System;
using Application.Activities.DTO;
using Application.Utils;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivities
{
    public record Command(CreateActivityDto ActivityDto) : IRequest<Result<string>>;

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command command, CancellationToken cancellationToken)
        {
            var activity = mapper.Map<Activity>(command.ActivityDto);
            await dbContext.Activities.AddAsync(activity, cancellationToken);
            var flag = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            if (!flag) return Result<string>.Fail("Failed to create activity", 400);
            return Result<string>.Success(activity.Id);
        }
    }
}
