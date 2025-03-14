using System;

namespace Application.Activities.DTO;

public record EditActivityDto : BaseActivityDto
{
    public string Id { get; set; } = string.Empty;
}
