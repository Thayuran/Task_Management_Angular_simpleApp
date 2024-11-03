using TaskManagement.DTO;

namespace TaskManagement.Services
{
    public interface IUserService
    {
        Task<TokenModel> AddRegister(UserCredentialsDTO userCredentialsDTO);
        Task<TokenModel> LoginUser(string email, string password);

    }
}
