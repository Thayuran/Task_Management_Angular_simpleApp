import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: UserService, private router: Router) {
  }
  canActivate(): boolean {

    console.log()
  if (this.authService.isUserLogin()) {
  return true;
  } else {
  this.router.navigate(['']);
  return false;
  }
  }
  }
