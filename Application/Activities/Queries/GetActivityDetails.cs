using System;
using Application.Utils;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public record Query(string Id) : IRequest<Result<Activity>>;

    public class Handler(AppDbContext dbContext) : IRequestHandler<Query, Result<Activity>>
    {
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.Id], cancellationToken);
            return activity == null
                ? Result<Activity>.Fail("Activity not found", 404)
                : Result<Activity>.Success(activity);
        }
    }
}
