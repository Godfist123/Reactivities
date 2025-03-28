using System;
using Application.Activities.DTO.Profiles;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IPhotoService
{
    Task<PhotoUploadResult> AddPhotoAsync(IFormFile file);
    Task<string> DeletePhotoAsync(string publicId);

}
