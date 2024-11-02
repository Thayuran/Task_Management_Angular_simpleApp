using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Model
{
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string? Description { get; set; }

        public DateTime DueDate { get; set; }

        [Required]
        public string priority {  get; set; }

        public User? assignee { get; set; }
        public int? assigneeId {  get; set; }

        public ICollection<Checklist>? Checklists { get; set; }

    }
}
