import { Component, OnInit, TemplateRef } from '@angular/core';
import { Task } from '../../task.model';
import { TaskServiceService } from '../../Services/task-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  searchtext:string='';
  tasklists:Task[]=[];
  modalRef?: BsModalRef;

  constructor(
    private taskservice:TaskServiceService,
    private toastr:ToastrService,
    private route:Router,
    private modalService:BsModalService
  )
  {

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
