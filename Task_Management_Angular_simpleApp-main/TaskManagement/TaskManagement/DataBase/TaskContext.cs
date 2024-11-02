using Microsoft.EntityFrameworkCore;
using TaskManagement.Model;

namespace TaskManagement.DataBase
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserCredentials> Credentials { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
                .HasMany(o => o.Tasks)
                .WithOne(u => u.assignee)
                .HasForeignKey(o => o.assigneeId);


            modelBuilder.Entity<TaskItem>()
                .HasMany(o => o.Checklists)
                .WithOne(u => u.Task)
                .HasForeignKey(o => o.TaskId);
            base.OnModelCreating(modelBuilder);
        }
    }
}
