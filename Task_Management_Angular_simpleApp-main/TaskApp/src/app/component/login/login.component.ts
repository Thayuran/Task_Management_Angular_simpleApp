import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


   loginForm:FormGroup





   get formcontrols()
  {
    return this.loginForm.controls;
  }
onSubmit()
{

}

}
