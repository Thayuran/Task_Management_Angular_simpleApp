import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyInterceptorService implements HttpInterceptor {


constructor(private toastr:ToastrService,private route:Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    const token=localStorage.getItem("Token");

  const modifiedReq = req.clone({
  headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next.handle(modifiedReq).pipe(catchError((error)=>
  {
if(error.status==403)
  {
    this.toastr.error("can't access this module");
  }
  if(error.status==500)
    {
      this.toastr.error("Internal server error occurred");
    }
    if(error.status==401)
      {
        this.route.navigate(['']);
      }
  return throwError(() =>error);
  })
);


  }
}
