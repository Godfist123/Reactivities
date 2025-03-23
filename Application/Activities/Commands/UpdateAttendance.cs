using System;
using Application.Interfaces;
using Application.Utils;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateAttendance
{
    public record Command(string id) : IRequest<Result<Unit>>;

    public class Handler(IUserAccessor userAccessor, AppDbContext dbContext)
    : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities
            .Include(x => x.Attendees)
            .ThenInclude(x => x.User).
            FirstOrDefaultAsync(x => x.Id == request.id);

            if (activity == null)
            {
                return Result<Unit>.Fail("Activity not found", 404);
            }

            var user = await userAccessor.GetUserAsync();

            var attendance = activity.Attendees.FirstOrDefault(x => x.UserId == user.Id);
            var isHost = activity.Attendees.Any(x => x.IsHost && x.UserId == user.Id);

            if (attendance != null)
            {
                if (isHost)
                {
                    activity.IsCancelled = !activity.IsCancelled;
                }
                else
                {
                    activity.Attendees.Remove(attendance);
                }
            }
            else
            {
                activity.Attendees.Add(new Domain.ActivityAttendee
                {
                    UserId = user.Id,
                    ActivityId = activity.Id,
                    IsHost = false
                });
            }
            var result = await dbContext.SaveChangesAsync() > 0;
            if (!result)
            {
                return Result<Unit>.Fail("Failed to update attendance", 400);
            }
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
