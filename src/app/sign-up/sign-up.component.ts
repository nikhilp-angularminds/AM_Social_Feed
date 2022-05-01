import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm:FormGroup
  submitted:boolean=false
  errMsg:any
  err:boolean=false
  token:any
  constructor(private service:HttpService, private router:Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      password:['', [
        Validators.required,
        Validators.minLength(6),
        ]]
    });
    this.token=localStorage.getItem("token")
    if(this.token){
      this.router.navigate(['feed'])
    }
  }
  get f(){
    return this.signUpForm.controls;
  }
  
  onSubmit(){
    this.submitted=true
    if (this.signUpForm.invalid) {
       return;
    }
    console.log(this.signUpForm.value);
    this.service.post('/signup',this.signUpForm.value).subscribe((data:any)=>{
      console.log(data);

      if(data.success==false){
        this.err=true
        console.log(this.err)
        this.errMsg=data.message
        console.log(this.errMsg)
        return;
      }
      else{
    this.router.navigate(['/login'])
      }
    })

  }

}
