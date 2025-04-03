using System;
using Application.Interfaces;
using Application.Utils;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class FollowToggle
{
    public record Command(string TargetUserId) : IRequest<Result<Unit>>;
    public class Handler(AppDbContext dbContext, IUserAccessor userAccessor)
     : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            var targetUser = await dbContext.Users.FindAsync(request.TargetUserId);
            if (targetUser == null) return Result<Unit>.Fail("User not found", 404);
            var flag = await dbContext.UserFollowings
            .AnyAsync(x => x.ObserverId == user.Id && x.TargetId == targetUser.Id
            , cancellationToken);
            if (flag)
            {
                dbContext.UserFollowings.Remove(new UserFollowing
                {
                    ObserverId = user.Id.ToString(),
                    TargetId = targetUser.Id
                });
            }
            else
            {
                dbContext.UserFollowings.Add(new UserFollowing
                {
                    ObserverId = user.Id.ToString(),
                    TargetId = targetUser.Id
                });
            }
            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            if (result) return Result<Unit>.Success(Unit.Value);
            return Result<Unit>.Fail("Failed to toggle follow", 500);
        }
    }
}
