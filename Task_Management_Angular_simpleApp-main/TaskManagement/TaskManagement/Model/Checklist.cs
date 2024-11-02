using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Model
{
    public class Checklist
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public bool isDone { get; set; }
        public int TaskId {  get; set; }
        public TaskItem? Task {  get; set; }
    }
}
