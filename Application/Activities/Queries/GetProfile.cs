using System;
using Application.Activities.DTO.Profiles;
using Application.Utils;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetProfile
{
    public record Query(string UserId) : IRequest<Result<UserProfile>>;

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Query, Result<UserProfile>>
    {
        public async Task<Result<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profile = await dbContext.Users.ProjectTo<UserProfile>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);
            if (profile == null)
                return Result<UserProfile>.Fail("User not found", 404);
            return profile == null
            ? Result<UserProfile>.Fail("User not found", 404)
            : Result<UserProfile>.Success(profile);
        }
    }
}
