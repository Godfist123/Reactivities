using System;
using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Security;

public class IsHostRequirement : IAuthorizationRequirement
{
    public class IsHostRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor)
     : AuthorizationHandler<IsHostRequirement>
    {
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return;

            var httpContext = httpContextAccessor.HttpContext;

            if (httpContext?.GetRouteValue("id") is not string activityId) return;

            var attendee = await dbContext.ActivityAttendees
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.UserId == userId && x.ActivityId == activityId);

            if (attendee == null) return;

            if (attendee.IsHost) context.Succeed(requirement);
        }
    }
}
