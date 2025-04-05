using System;
using Application.Activities.DTO;
using Application.Interfaces;
using Application.Utils;
using Application.Utils.Pagination;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public record Query : IRequest<Result<PagedList<ActivityReturnDto, DateTime?>>>
    {
        public required ActivityParams Params { get; set; }

    }

    public class Handler(AppDbContext dbContext, IMapper mapper, IUserAccessor userAccessor)
    : IRequestHandler<Query, Result<PagedList<ActivityReturnDto, DateTime?>>>
    {
        public async Task<Result<PagedList<ActivityReturnDto, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = dbContext.Activities
            .OrderBy(x => x.Date)
            .Where(x => x.Date >= (request.Params.Cursor ?? request.Params.StartDate))
            .AsQueryable();

            if (!string.IsNullOrEmpty(request.Params.Filter))
            {
                query = request.Params.Filter switch
                {
                    "isGoing" => query.Where(x =>
                     x.Attendees.Any(x => x.UserId == userAccessor.GetUserId())),
                    "isHost" => query.Where(x =>
                     x.Attendees.Any(x => x.IsHost && x.UserId == userAccessor.GetUserId())),
                    _ => query
                };
            }

            var activities = await query
            .Take(request.Params.PageSize + 1)
            .ProjectTo<ActivityReturnDto>(mapper.ConfigurationProvider,
                new { currentUserId = userAccessor.GetUserId() })
            .ToListAsync(cancellationToken);

            DateTime? nextCursor = null;

            if (activities.Count > request.Params.PageSize)
            {
                nextCursor = activities.Last().Date;
                activities.RemoveAt(activities.Count - 1);
            }

            return Result<PagedList<ActivityReturnDto, DateTime?>>.Success(new PagedList<ActivityReturnDto, DateTime?>
            {
                Items = activities,
                NextCursor = nextCursor
            });
        }
    }

}
