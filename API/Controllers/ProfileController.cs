using Application.Activities.Commands;
using Application.Activities.DTO.Profiles;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController(IMediator mediator) : BaseApiController
    {
        [HttpPost("add-photo")]
        public async Task<ActionResult<Photo>> AddPhoto([FromForm] AddPhoto.Command command)
        {
            return ResultHandler<Photo>(await mediator.Send(command));
        }

        [HttpGet("photos/{userId}")]
        public async Task<ActionResult<List<Photo>>> GetProfilePhotos(string userId)
        {
            return ResultHandler<List<Photo>>(await mediator.Send(new GetProfilePhotos.Query(userId)));
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult<Unit>> DeletePhoto(string photoId)
        {
            return ResultHandler<Unit>(await mediator.Send(new DeletePhoto.Command(photoId)));
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult<Unit>> SetMainPhoto(string photoId)
        {
            return ResultHandler<Unit>(await mediator.Send(new SetMainPhoto.Command(photoId)));
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<UserProfile>> GetProfile(string userId)
        {
            return ResultHandler<UserProfile>(await mediator.Send(new GetProfile.Query(userId)));
        }
    }
}
