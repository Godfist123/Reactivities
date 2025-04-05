using System;
using Application.Activities.Commands;
using Application.Activities.DTO;
using Application.Activities.Queries;
using Application.Utils;
using Domain;

using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

public class ActivitiesController(IMediator mediator) : BaseApiController()
{
    [HttpGet]
    public async Task<ActionResult<PagedList<ActivityReturnDto, DateTime?>>> GetActivities(
        [FromQuery] ActivityParams activityParams)
    {
        return ResultHandler<PagedList<ActivityReturnDto, DateTime?>>(await mediator.Send(new GetActivityList.Query
        {
            Params = activityParams
        }));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityReturnDto>> GetActivityById(string id)
    {

        return ResultHandler<ActivityReturnDto>(await mediator.Send(new GetActivityDetails.Query(id)));

    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity([FromBody] CreateActivityDto activity)
    {
        return ResultHandler<string>(await mediator.Send(new CreateActivities.Command(activity)));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "IsHost")]
    public async Task<ActionResult<Unit>> EditActivity(string id, [FromBody] EditActivityDto activity)
    {
        try
        {
            activity.Id = id;
            return ResultHandler<Unit>(await mediator.Send(new EditActivity.Command(id, activity)));
        }
        catch (KeyNotFoundException)
        {
            return NotFound(new { Message = "Activity not found" });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "IsHost")]
    public async Task<ActionResult<Unit>> DeleteActivity(string id)
    {
        try
        {
            return ResultHandler<Unit>(await mediator.Send(new DeleteActivity.Command(id)));

        }
        catch (KeyNotFoundException)
        {
            return NotFound(new { Message = "Activity not found" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "An error occurred", Error = ex.Message });
        }
    }

    [HttpPost("{id}/attend")]
    public async Task<ActionResult<Unit>> AttendActivity(string id)
    {
        return ResultHandler<Unit>(await mediator.Send(new UpdateAttendance.Command(id)));
    }
}
