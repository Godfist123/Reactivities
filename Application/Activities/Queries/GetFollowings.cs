using System;
using Application.Activities.DTO.Profiles;
using Application.Interfaces;
using Application.Utils;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetFollowings
{
    public record Query(string UserId, string Predicate = "followers")
    : IRequest<Result<List<UserProfile>>>;
    public class Handler(AppDbContext dbContext, IMapper mapper, IUserAccessor userAccessor)
    : IRequestHandler<Query, Result<List<UserProfile>>>
    {
        public async Task<Result<List<UserProfile>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profiles = new List<UserProfile>();
            switch (request.Predicate)
            {
                case "followers":
                    profiles = await dbContext.UserFollowings
                    .Where(x => x.TargetId == request.UserId)
                    .Select(x => x.Observer)
                    .ProjectTo<UserProfile>(mapper.ConfigurationProvider,
                        new { currentUserId = userAccessor.GetUserId() })
                    .ToListAsync(cancellationToken);
                    break;
                case "following":
                    profiles = await dbContext.UserFollowings
                    .Where(x => x.ObserverId == request.UserId)
                    .Select(x => x.Target)
                    .ProjectTo<UserProfile>(mapper.ConfigurationProvider,
                        new { currentUserId = userAccessor.GetUserId() })
                    .ToListAsync(cancellationToken);
                    break;
            }
            return Result<List<UserProfile>>.Success(profiles);
        }
    }
}
