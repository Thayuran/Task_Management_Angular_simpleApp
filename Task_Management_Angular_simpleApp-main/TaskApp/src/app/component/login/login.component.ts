import { UserService } from './../../Services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, NavigationEnd, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { daLocale } from 'ngx-bootstrap/chronos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


   loginForm:FormGroup;
  login:LoginDetails;

  constructor(private fb:FormBuilder,private userservice:UserService,private route:Router,private toastr:ToastrService)
  {
    this.loginForm=this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmedpassword:['',[Validators.required]]
    })

    this.login={email:'',password:''}

  }



   get logincontrols()
  {
    return this.loginForm.controls;
  }


onSubmit()
{
  // let loginuser=this.loginForm.value;

  this.userservice.loggedIn(this.login).subscribe(data=>
    {
      localStorage.setItem("Token",data);
      const userDetails:any=jwtDecode(data);

      localStorage.setItem("Name",userDetails.Name);
      this.route.navigate(['admin/tasks']);

    },error=>
      {
        this.toastr.error(error.error)
      }
)
}

}

export interface LoginDetails
{
  email:string;
  password:string;
}
