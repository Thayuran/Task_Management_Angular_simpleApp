import { Component, OnInit, numberAttribute } from '@angular/core';
import { User } from '../../user.model';
import { UserService } from '../../Services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{

userform:FormGroup;
isEditMode=false;
userId:number=0;

  constructor(private userservice:UserService,
    private fb:FormBuilder,
    private route:Router,
    private toast:ToastrService,
    private activeroute:ActivatedRoute)
  {
    const uid=this.activeroute.snapshot.paramMap.get("id");


        this.userform=this.fb.group({
          name:[''],
          email:[''],
          phone:['',[Validators.required]]
    })


    if(uid)
      {
        this.userId=Number(uid);
        this.isEditMode=true;
      }
      else{
        this.isEditMode=false;
      }

  }


  ngOnInit(): void
  {
    if(this.isEditMode)
      {
        this.userservice.getUser(this.userId).subscribe(data=>
          {
            this.userform.patchValue(
            {
              id:data.id,
              name:data.name,
              email:data.email,
              phone:data.phone

            })
          },
          error=>
            {
              this.toast.error("user not found");
            }
        );
      }
  }


  cancel()
  {
        this.userform.reset();
        this.route.navigate(["/users"]);
  }

  onSubmit()
  {
    let selectuser=this.userform.value;
    if(this.isEditMode)
      {
        selectuser.id=this.userId;

        this.userservice.updateUser(selectuser,this.userId).subscribe(data=>{
        this.toast.success('user update sucessfully')
        this.route.navigate(["/users"])
      });
    }
    else{
        this.userservice.createUser(selectuser).subscribe(data=>{
        this.toast.success('user add sucessfully')
        this.route.navigate(["/users"])
    });

  }
}
}
