using Application.Utils;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseApiController() : ControllerBase
    {
        protected ActionResult<T> ResultHandler<T>(Result<T> result)
        {
            if (!result.IsSuccess && result.StatusCode == 404)
            {
                return NotFound(new { Message = result.ErrorMessage });
            }
            if (result.IsSuccess && result.Data != null)
            {
                return Ok(result.Data);
            }
            return StatusCode(result.StatusCode, new { Message = result.ErrorMessage });
        }
    }
}
