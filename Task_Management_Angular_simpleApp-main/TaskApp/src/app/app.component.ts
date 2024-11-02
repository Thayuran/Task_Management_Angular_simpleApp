import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from './Services/task-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'TaskApp';
  tasks:any[]=[];

  constructor(private taskservice:TaskServiceService)
  {

  }
  ngOnInit(): void
   {
    this.taskservice.getTasks().subscribe(data=>
    {
      this.tasks=data;
    })
  }
}
