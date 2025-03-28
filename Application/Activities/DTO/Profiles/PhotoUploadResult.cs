using System;

namespace Application.Activities.DTO.Profiles;

public class PhotoUploadResult
{
    public required string PublicId { get; set; }
    public required string Url { get; set; }
}
