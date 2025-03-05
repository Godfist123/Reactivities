using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseApiController(IMediator mediator) : ControllerBase
    {
        protected readonly IMediator Mediator = mediator;
    }
}
