using System;
using Application.Utils;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public record Command(string Id) : IRequest<Result<Unit>>;
    public class Handler(AppDbContext dbContext) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command command, CancellationToken cancellationToken)
        {
            var activity = await dbContext.FindAsync<Activity>(command.Id);
            if (activity == null) return Result<Unit>.Fail("Activity not found", 404);
            dbContext.Remove(activity);
            var flag = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            if (!flag) return Result<Unit>.Fail("Failed to delete activity", 400);
            return Result<Unit>.Success(Unit.Value);
        }
    }

}
