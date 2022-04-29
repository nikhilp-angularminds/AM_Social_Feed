import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  submitted:boolean=false
  constructor(private service:HttpService, private router:Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
    email:['',[Validators.required, Validators.email]],
      password:['', [
        Validators.required,
        Validators.minLength(6),
        ]]
    });
  }
  get f(){
    return this.loginForm.controls;
  }
  onSubmit(){
    this.submitted=true
    if (this.loginForm.invalid) {
       return;
    }
    console.log(this.loginForm.value);
     this.service.post('user/login',this.loginForm.value).subscribe((data:any)=>{
      console.log(data);
    })
    this.router.navigate(['feed']);

  }

}
