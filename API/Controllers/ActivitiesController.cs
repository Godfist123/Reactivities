using System;
using Application.Activities.Commands;
using Application.Activities.DTO;
using Application.Activities.Queries;
using Domain;

using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

public class ActivitiesController(IMediator mediator) : BaseApiController()
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return ResultHandler<List<Activity>>(await mediator.Send(new GetActivityList.Query()));
    }

    [Authorize(Roles = "User")]
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityById(string id)
    {

        return ResultHandler<Activity>(await mediator.Send(new GetActivityDetails.Query(id)));

    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity([FromBody] CreateActivityDto activity)
    {
        return ResultHandler<string>(await mediator.Send(new CreateActivities.Command(activity)));
    }

    [HttpPut("{id}")]
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
}
