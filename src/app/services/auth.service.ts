import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  // getErrorHandler(errRes:HttpErrorResponse){
  //   let errMsg= 'An Error Occured';

  //   if(!errRes.error || !errRes.error.error){
  //     return throwError(errMsg)
  //   }
  //   if(errRes.error || errRes.error.error){
  //     this.router.navigate(['login'])
  //   }
   
  // }
}
