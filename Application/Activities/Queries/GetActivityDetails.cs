using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public record Query(string Id) : IRequest<Activity>;

    public class Handler(AppDbContext dbContext) : IRequestHandler<Query, Activity>
    {
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.Id], cancellationToken);
            return activity ?? throw new Exception("Activity not found");
        }
    }
}
