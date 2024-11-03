import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  SignupForm:FormGroup;


  constructor(private fb:FormBuilder)
    {
      this.SignupForm=this.fb.group({
        username:['',[Validators.required]],
        email:['',[Validators.required]],
        password:['',[Validators.required]],
        confirmedpassword:['',[Validators.required]]
      })
    }
  

  onSubmit()
  {
        let signupuser=this.SignupForm.value;
  }
}
