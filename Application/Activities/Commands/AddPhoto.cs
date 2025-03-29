using System;
using Application.Activities.DTO.Profiles;
using Application.Interfaces;
using Application.Utils;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Activities.Commands;

public class AddPhoto
{
    public record Command(IFormFile File) : IRequest<Result<Photo>>;

    public class Handler(IUserAccessor userAccessor, AppDbContext dbContext
    , IPhotoService photoService) : IRequestHandler<Command, Result<Photo>>
    {
        public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            var uploadRes = await photoService.AddPhotoAsync(request.File);
            if (uploadRes == null) return Result<Photo>.Fail("Failed to upload photo", 400);
            var photo = new Photo
            {
                Url = uploadRes.Url,
                PublicId = uploadRes.PublicId,
                UserId = userAccessor.GetUserId()
            };

            await dbContext.Photos.AddAsync(photo, cancellationToken);
            var user = dbContext.Users.FirstOrDefault(x => x.Id == userAccessor.GetUserId());
            if (user != null)
            {
                user.ImageUrl ??= photo.Url;
            }

            var flag = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            if (!flag) return Result<Photo>.Fail("Failed to add photo", 400);
            return Result<Photo>.Success(photo);
        }
    }
}
