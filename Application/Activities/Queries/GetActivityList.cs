using System;
using Application.Activities.DTO;
using Application.Utils;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public record Query : IRequest<Result<List<ActivityReturnDto>>>;

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Query, Result<List<ActivityReturnDto>>>
    {
        public async Task<Result<List<ActivityReturnDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            if (await dbContext.Activities.ToListAsync(cancellationToken) != null)
            {
                return Result<List<ActivityReturnDto>>.Success(
                    await dbContext.Activities
                    .ProjectTo<ActivityReturnDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken));
            }
            else
            {
                return Result<List<ActivityReturnDto>>.Fail("No activities found", 404);
            }
        }
    }

}
