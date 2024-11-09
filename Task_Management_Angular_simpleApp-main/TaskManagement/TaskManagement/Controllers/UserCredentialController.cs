using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.DataBase;
using TaskManagement.DTO;
using TaskManagement.Model;
using TaskManagement.Services;

namespace TaskManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCredentialController : ControllerBase
    {

        private readonly TaskContext _context;
        private readonly IUserService _userservice;

        public UserCredentialController(TaskContext context,IUserService userService)
        {
            _context = context;
            _userservice = userService;
        }

        [HttpPost("register")]

        public async Task<IActionResult>RegisterUser(UserCredentialsDTO user)
        {
            try
            {
                var data = await _userservice.AddRegister(user);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        [HttpGet("login")]      
        public async Task<IActionResult> LoginUser(string email, string password)
        {
           /* var currentuser = _context.Credentials.FirstOrDefaultAsync(u => u.Email == email);*/
            try
            {
                var data=await _userservice.LoginUser(email,password);
                return Ok(data);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
            
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> checkAPI()
        {
            try
            {
                var role = User.FindFirst("Role").Value;
                return Ok(role);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
