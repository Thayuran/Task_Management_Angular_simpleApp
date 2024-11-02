import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskServiceService } from '../../Services/task-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { identity } from 'rxjs';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  taskid:number;


constructor(private activeroute:ActivatedRoute,private taskservice:TaskServiceService,private fb:FormBuilder,
  private route:Router,private toast:ToastrService)
{
 
const taskID=this.activeroute.snapshot.paramMap.get("id");
this.taskid=Number(taskID);

  this.taskForm=this.fb.group({
    id:[''],
    title:['',[Validators.required]],
    description:[''],
    dueDate:[''],
    priority:['',[Validators.required]]

  })
}


ngOnInit(): void {
  this.taskservice.getTask(this.taskid).subscribe(data=>
    {
      let dueDate=new Date(data.dueDate).toISOString().slice(0,10);
      this.taskForm.patchValue(
        {
          id:data.id,
          title:data.title,
          description:data.description,
          dueDate:dueDate,
          priority:data.priority
        }
      )


    },
    error=>
      {
        this.toast.error('task not found')
      }
  );
}
cancel()
{
      this.taskForm.reset();
      this.route.navigate(["/tasks"]);
}

onSubmit()
    {
    const task=this.taskForm.value;
    console.log(task);
    this.taskservice.updateTask(task).subscribe(data=>
      {this.toast.success("task is update success");
      this.route.navigate(["/tasks"]);
    });
}

}
