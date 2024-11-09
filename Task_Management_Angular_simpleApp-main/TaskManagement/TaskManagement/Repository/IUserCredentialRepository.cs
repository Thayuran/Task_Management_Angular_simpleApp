using TaskManagement.Model;

namespace TaskManagement.Repository
{
    public interface IUserCredentialRepository
    {
        Task<UserCredentials> GetUserByEmail(string email);
        Task<UserCredentials> AddUser(UserCredentials user);
    }
}
