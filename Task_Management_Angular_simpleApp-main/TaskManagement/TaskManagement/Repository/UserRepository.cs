using TaskManagement.DataBase;

namespace TaskManagement.Repository
{
    public class UserRepository
    {

        private readonly TaskContext _taskContext;
        public UserRepository(TaskContext taskContext)
        {
            _taskContext = taskContext;
        }




    }
}
