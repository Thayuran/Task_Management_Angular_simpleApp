import { Component, OnInit, TemplateRef } from '@angular/core';
import { Task } from '../../task.model';
import { TaskServiceService } from '../../Services/task-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../user.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  searchtext:string='';
  tasklists:Task[]=[];
  modalRef?: BsModalRef;

taskForm:FormGroup;
users:User[]=[];

  constructor(
    private taskservice:TaskServiceService,
    private toastr:ToastrService,
    private route:Router,
    private modalService:BsModalService,private fb:FormBuilder,
  private toast:ToastrService)
  {
    let currentDate=new Date().toISOString().slice(0,10);
    this.taskForm=this.fb.group({
      title:['',[Validators.required]],
      description:[''],
      dueDate:[currentDate],
      priority:['',[Validators.required]],
      checklists:this.fb.array([]),
      assigneeId:['']

    })

  }


  onSubmit()
    {
    let task=this.taskForm.value;
    this.taskservice.createTask(task).subscribe(data=>
      {
        this.toast.success("task is create success");
      this.route.navigate(["/tasks"]);
    });
}

get MyChecklists():FormArray
{
  return this.taskForm.get('checklists') as FormArray
}

addChecklist()
{
  this.MyChecklists.push(this.fb.group({
    name:[''],
    isDone:[false]
  }))
}

removeChecklist(index:number)
{
  this.MyChecklists.removeAt(index);
}


  ngOnInit(): void {
      this.loadTasks();
  }

  loadTasks()
  {
    this.taskservice.getTasks().subscribe(data=>
    {
      this.tasklists=data;
    }
    )
  }

  cancel()
  {
        this.taskForm.reset();
        this.route.navigate(["/tasks"]);
  }


  onEdit(taskId:number)
  {
    this.route.navigate(['/task-edit',taskId])
  }

  onDelete(taskID:number)
  {
    if(confirm('Do you want to delete this id?'))
    {
    this.taskservice.deleteTask(taskID).subscribe(data=>
    {
      this.toastr.error('This task is deleted',"Deleted",
      {
        timeOut:10000,
        closeButton:true
      });
      this.loadTasks();

    });
  }
}


openModal(template: TemplateRef<void>)
{
 this.modalRef = this.modalService.show(template);
}



confirm(taskId:number)
  {
    this.modalRef?.hide();
      this.taskservice.deleteTask(taskId).subscribe(data=>
      {
       this.toastr.error('This task is deleted',"Deleted",
          {
            timeOut:10000,
            closeButton:true
          });
          this.loadTasks();
      })
  }



  decline()
  {
    this.modalRef?.hide();
  }

}
