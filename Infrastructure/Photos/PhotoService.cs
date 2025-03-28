using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Application.Interfaces;
using Infrastructure.Photos;
using Application.Activities.DTO.Profiles;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary _cloudinary;

    public PhotoService(IOptions<CloudinarySettings> options)
    {
        var account = new Account(
            options.Value.CloudName,
            options.Value.ApiKey,
            options.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(account);
    }

    public async Task<PhotoUploadResult> AddPhotoAsync(IFormFile file)
    {
        await using var stream = file.OpenReadStream();
        var uploadParms = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            //Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
            Folder = "Reactivities"
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParms);
        if (uploadResult.Error != null)
        {
            throw new Exception(uploadResult.Error.Message);
        }

        return new PhotoUploadResult
        {
            PublicId = uploadResult.PublicId,
            Url = uploadResult.SecureUrl.AbsoluteUri
        };
    }

    public Task<string> DeletePhotoAsync(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        var res = _cloudinary.Destroy(deleteParams);
        if (res.Error != null)
        {
            throw new Exception(res.Error.Message);
        }
        return Task.FromResult(res.Result);
    }


}
