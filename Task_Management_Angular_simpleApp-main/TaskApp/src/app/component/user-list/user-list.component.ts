import { Component, TemplateRef } from '@angular/core';
import {UserService} from '../../Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../user.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

searchtext: string='';
userlists:User[]=[];
modalRef?: BsModalRef;

userform:FormGroup;
isEditMode=false;
userId:number=0;


constructor(private userservice:UserService,
  private toastr:ToastrService,
  private route:Router,
  private modalService:BsModalService,
  private fb:FormBuilder,
  private activeroute:ActivatedRoute,
  private toast:ToastrService)
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

  ngOnInit(): void {
      this.loadTasks();
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
        this.route.navigate(["/admin/users"]);
  }

  loadTasks()
  {
    this.userservice.getUsers().subscribe(data=>
    {
      this.userlists=data;
    }
    )
  }

  onEdit(userid:number)
  {
    this.route.navigate(['/user-edit',userid])
  }

  onDelete(taskID:number)
  {
    if(confirm('Do you want to delete this id?'))
    {
    this.userservice.deleteUser(taskID).subscribe(data=>
    {
      this.toastr.error('This user is deleted',"Deleted",
      {
        timeOut:10000,
        closeButton:true
      });
      this.loadTasks();

    });
  }
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

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }


  confirm()
  {

  }

  decline()
  {
    this.modalRef?.hide();
  }


}
