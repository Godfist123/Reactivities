using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public record Command(string Id) : IRequest;
    public class Handler(AppDbContext dbContext) : IRequestHandler<Command>
    {
        public async Task Handle(Command command, CancellationToken cancellationToken)
        {
            var activity = await dbContext.FindAsync<Activity>(command.Id) ?? throw new KeyNotFoundException("Activity not found");
            dbContext.Remove(activity);
            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }

}
