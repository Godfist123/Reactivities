using System;

namespace Application.Activities.DTO;

public record ActivityDto : BaseActivityDto
{
    public string id { get; set; } = "";
}
