import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './component/task-list/task-list.component';
import { TaskEditComponent } from './component/task-edit/task-edit.component';
import { TaskAddComponent } from './component/task-add/task-add.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';

const routes: Routes = [


  {path:'tasks',component:TaskListComponent},
  {path:'task-add',component:TaskAddComponent},
  {path:'task-edit/:id',component:TaskEditComponent},


  {path:'users',component:UserListComponent},
  {path:'user-add',component:UserFormComponent},
  {path:'user-edit/:id',component:UserFormComponent},

  {path:'login',component:LoginComponent},
  {path:'register',component:SignupComponent},
  {path:'',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }