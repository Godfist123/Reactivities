using System;
using Application.Activities.DTO;
using Application.Utils;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetComments
{
    public record Query(string Id) : IRequest<Result<List<CommentDto>>>;
    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Query, Result<List<CommentDto>>>
    {

        public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var comments = await dbContext.Comments.Where(c => c.ActivityId == request.Id)
                .OrderByDescending(x => x.CreatedAt).ProjectTo<CommentDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
            return Result<List<CommentDto>>.Success(comments);
        }
    }
}
