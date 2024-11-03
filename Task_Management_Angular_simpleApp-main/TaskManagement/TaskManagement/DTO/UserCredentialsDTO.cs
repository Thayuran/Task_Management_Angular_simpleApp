using TaskManagement.Model;
using static TaskManagement.Model.UserCredentials;

namespace TaskManagement.DTO
{
    public class UserCredentialsDTO
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Roles Role { get; set; }
    }
}
