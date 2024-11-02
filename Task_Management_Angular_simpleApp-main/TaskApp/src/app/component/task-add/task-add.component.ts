import { User } from './../../user.model';
import { TaskServiceService } from './../../Services/task-service.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent implements OnInit {
  taskForm: FormGroup;
  users:User[]=[];

constructor(private taskservice:TaskServiceService,private fb:FormBuilder,
  private route:Router,private toast:ToastrService,private userservice:UserService)
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
    this.userservice.getUsers().subscribe(data=>
    {
      this.users=data;
    }
    )
}
cancel()
{
      this.taskForm.reset();
      this.route.navigate(["/tasks"]);
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

}
