using System;
using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

public class ActivitiesController(IMediator mediator) : BaseApiController(mediator)
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivityById(string id)
    {
        try
        {
            var activity = await mediator.Send(new GetActivityDetails.Query(id));
            return Ok(activity);
        }
        catch (KeyNotFoundException) // Handle specific exception
        {
            return NotFound(new { Message = "Activity not found" });
        }
        catch (Exception ex) // Catch unexpected errors
        {
            return StatusCode(500, new { Message = "An error occurred", Error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity([FromBody] Activity activity)
    {
        return await Mediator.Send(new CreateActivities.Command(activity));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Activity>> EditActivity(string id, [FromBody] Activity activity)
    {
        try
        {
            return await Mediator.Send(new EditActivity.Command(id, activity));
        }
        catch (KeyNotFoundException)
        {
            return NotFound(new { Message = "Activity not found" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(string id)
    {
        try
        {
            await Mediator.Send(new DeleteActivity.Command(id));
            return NoContent();
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
