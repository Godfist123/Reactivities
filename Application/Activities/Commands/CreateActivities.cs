using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivities
{
    public record Command(Activity Activity) : IRequest<string>;

    public class Handler(AppDbContext dbContext) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command command, CancellationToken cancellationToken)
        {
            command.Activity.Id = Guid.NewGuid().ToString();
            await dbContext.Activities.AddAsync(command.Activity, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
            return command.Activity.Id;
        }
    }
}
