using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public record Command(string Id, Activity Activity) : IRequest<Activity>;

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Command, Activity>
    {
        public async Task<Activity> Handle(Command command, CancellationToken cancellationToken)
        {
            var activity = await dbContext.FindAsync<Activity>(command.Id) ?? throw new KeyNotFoundException("Activity not found");
            activity = mapper.Map(command.Activity, activity);
            await dbContext.SaveChangesAsync(cancellationToken);
            return activity;
        }
    }
}
