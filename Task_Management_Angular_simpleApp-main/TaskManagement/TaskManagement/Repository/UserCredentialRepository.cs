using Microsoft.EntityFrameworkCore;
using TaskManagement.DataBase;
using TaskManagement.Model;

namespace TaskManagement.Repository
{
    public class UserCredentialRepository: IUserCredentialRepository
    {
        private readonly TaskContext _taskContext;

        public UserCredentialRepository(TaskContext taskContext)
        {

            _taskContext = taskContext;
        }

        public async Task<UserCredentials> AddUser(UserCredentials userCredentials)
        {
            var data = await _taskContext.Credentials.AddAsync(userCredentials);
            _taskContext.SaveChangesAsync();
            return data.Entity;
        }

        public async Task<UserCredentials>GetUserByEmail(string email)
        {
            var valid=await _taskContext.Credentials.SingleOrDefaultAsync(a=>a.Email==email);
            
            return valid;
        }
    }
}
