using System;
using Application.Activities.Commands;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class CommentHub(IMediator mediator) : Hub
{
    public async Task SendComment(string body, string ActivityId)
    {
        var comment = await mediator.Send(new AddComment.Command(body, ActivityId));
        await Clients.Group(ActivityId).SendAsync("ReceiveComment", comment);
    }
    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var activityId = httpContext?.Request.Query["activityId"];

        if (string.IsNullOrEmpty(activityId))
        {
            throw new HubException("Activity ID is required.");
        }
        await Groups.AddToGroupAsync(Context.ConnectionId, activityId!);

        var result = await mediator.Send(new GetComments.Query(activityId!));
        await Clients.Caller.SendAsync("LoadComments", result);
    }
}
