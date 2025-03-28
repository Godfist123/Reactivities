using System;
using Application.Utils;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetProfilePhotos
{
    public record Query(string UserId) : IRequest<Result<List<Photo>>>;

    public class Handler(AppDbContext dbContext) : IRequestHandler<Query, Result<List<Photo>>>
    {
        public async Task<Result<List<Photo>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await dbContext.Users.Include(x => x.Photos)
            .FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);
            var photos = user?.Photos?.ToList() ?? new List<Photo>();
            return Result<List<Photo>>.Success(photos);
        }
    }
}
