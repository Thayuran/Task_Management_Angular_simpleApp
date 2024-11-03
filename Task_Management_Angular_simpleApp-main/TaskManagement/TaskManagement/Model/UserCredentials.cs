using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Model
{
    public class UserCredentials
    {
        public Guid Id { get; set; }

        [Required]
        public string FullName { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public Roles Role { get; set; }


    }
}
