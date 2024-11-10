import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs';
import { LoginDetails } from '../component/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl="http://localhost:5207/api/Users";
  constructor(private http:HttpClient) { }

loginUrl="http://localhost:5207/api/UserCredential";
  loggedIn(loginreq:LoginDetails)
  {
    return this.http.post(this.loginUrl+'/login',loginreq,
      {
        responseType:'text'
      }
    );
  }

isLoggedIn()
{
  if(localStorage.getItem("Token"))
    {
      return true;
    }
    else{
      return false;
    }
}


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


  isUserLogin(){
    if(localStorage.getItem('token') !== null){
      return true;
    }else
    {
      return false;
    }
  }
}
localStorage.getItem('token') !== null ;
