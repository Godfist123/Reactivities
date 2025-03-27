using System;
using Application.Activities.DTO;
using Application.Utils;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public record Query(string Id) : IRequest<Result<ActivityReturnDto>>;

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Query, Result<ActivityReturnDto>>
    {
        public async Task<Result<ActivityReturnDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities
                .ProjectTo<ActivityReturnDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            return activity == null
                ? Result<ActivityReturnDto>.Fail("Activity not found", 404)
                : Result<ActivityReturnDto>.Success(activity); // already mapped
        }
    }

}
