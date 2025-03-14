using System;
using Application.Utils;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public record Query : IRequest<Result<List<Activity>>>;

    public class Handler(AppDbContext dbContext) : IRequestHandler<Query, Result<List<Activity>>>
    {
        public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
        {
            if (await dbContext.Activities.ToListAsync(cancellationToken) != null)
            {
                return Result<List<Activity>>.Success(await dbContext.Activities.ToListAsync(cancellationToken));
            }
            else
            {
                return Result<List<Activity>>.Fail("No activities found", 404);
            }
        }
    }

}
