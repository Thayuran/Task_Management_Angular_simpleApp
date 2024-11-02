import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl="http://localhost:5207/api/Users";
  constructor(private http:HttpClient) { }

  getUsers()
  {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(userId:number)
  {
    return this.http.get<User>(this.baseUrl+"/"+userId);
  }

  createUser(user:User)
  {
    return this.http.post(this.baseUrl,user);
  }

  updateUser(user:User,userid:number)
  {
    return this.http.put(this.baseUrl+"/"+userid,user);
  }

  deleteUser(userId:number)
  {
    return this.http.delete(this.baseUrl+"/"+userId);
  }
}
