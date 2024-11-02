using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagement.DataBase;
using TaskManagement.Model;

namespace TaskManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCredentialController : ControllerBase
    {

        private readonly TaskContext _context;

        public UserCredentialController(TaskContext context)
        {
            _context = context;
        }

        [HttpPost("register")]

        public async Task<IActionResult>RegisterUser(UserCredentials user)
        {
            var data = await _context.Credentials.AddAsync(user);
            return Ok(data);
        }

        [HttpPost("login")]
        public async Task<IActionResult>LoginUser(string email,string password)
        {
            var currentuser = _context.Credentials.FirstOrDefaultAsync(u => u.Email == email);
            if (currentuser == null)
            {
                throw new Exception("user not found");
            }
            var isvalidpw=BCrypt.Net.BCrypt.Verify(password);
        }
    }
}
