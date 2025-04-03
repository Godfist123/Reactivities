using System;
using Application.Activities.DTO;
using Application.Interfaces;
using Application.Utils;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class AddComment
{
    public record Command(string Body, string ActivityId)
    : IRequest<Result<CommentDto>>;

    public class Handler(IMapper mapper, AppDbContext dbContext, IUserAccessor userAccessor)
     : IRequestHandler<Command, Result<CommentDto>>
    {
        public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.Include(x => x.Comments)
            .ThenInclude(x => x.User)
            .FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);
            if (activity == null) return Result<CommentDto>.Fail("Activity not found", 404);

            var userId = userAccessor.GetUserId();
            var comment = new Comment
            {
                Body = request.Body,
                UserId = userId,
                ActivityId = activity.Id
            };

            activity.Comments.Add(comment);
            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            if (result)
            {
                var commentDto = mapper.Map<CommentDto>(comment);
                return Result<CommentDto>.Success(commentDto);
            }
            return Result<CommentDto>.Fail("Failed to add comment", 500);
        }
    }
}
