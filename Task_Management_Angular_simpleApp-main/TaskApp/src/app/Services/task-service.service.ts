import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  baseUrl="http://localhost:5207/api/Tasks";
  constructor(private http:HttpClient) { }

  getTasks()
  {
    return this.http.get<Task[]>(this.baseUrl);
  }

  getTask(taskId:number)
  {
    return this.http.get<Task>(this.baseUrl+"/"+taskId);
  }

  createTask(task:Task)
  {
    return this.http.post(this.baseUrl,task);
  }

  updateTask(task:Task)
  {
    return this.http.put(this.baseUrl+"/"+task.id,task);
  }

  deleteTask(taskId:number)
  {
    return this.http.delete(this.baseUrl+"/"+taskId);
  }
}
