import { Component, TemplateRef } from '@angular/core';
import {UserService} from '../../Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../user.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

searchtext: string='';
userlists:User[]=[];
modalRef?: BsModalRef;

constructor(private userservice:UserService,
  private toastr:ToastrService,
  private route:Router,
  private modalService:BsModalService)
  {

  }

  ngOnInit(): void {
      this.loadTasks();
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
