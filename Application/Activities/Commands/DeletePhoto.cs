using System;
using Application.Interfaces;
using Application.Utils;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeletePhoto
{
    public record Command(string PhotoId) : IRequest<Result<Unit>>;

    public class Handler(AppDbContext dbContext, IUserAccessor userAccessor
    , IPhotoService photoService) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();

            var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);
            if (photo == null) return Result<Unit>.Fail("Photo not found", 400);
            if (photo.Url == user.ImageUrl)
                return Result<Unit>.Fail("Cannot delete profile photo", 400);
            await photoService.DeletePhotoAsync(photo.PublicId);

            user.Photos.Remove(photo);
            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<Unit>.Fail("Failed to delete photo", 500);
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
