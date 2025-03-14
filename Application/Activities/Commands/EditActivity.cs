using System;
using Application.Activities.DTO;
using Application.Utils;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public record Command(string Id, EditActivityDto Activity) : IRequest<Result<Unit>>;

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command command, CancellationToken cancellationToken)
        {
            var activity = await dbContext.FindAsync<Activity>(command.Id);
            if (activity == null) return Result<Unit>.Fail("Activity not found", 404);
            activity = mapper.Map(command.Activity, activity);
            var flag = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            if (!flag) return Result<Unit>.Fail("Failed to update activity", 400);
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
