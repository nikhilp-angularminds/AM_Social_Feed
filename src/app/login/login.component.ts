import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../services/http.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  submitted:boolean=false
  token:any
  googleUserData:any
  userData:any
  constructor(private authService: SocialAuthService,private toastr: ToastrService,private service:HttpService, private router:Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
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
    return this.loginForm.controls;
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res: any) => {
      console.log(res);
      this.userData = res;
      let passString = "@123"
      this.googleUserData = {
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        password: `${res.firstName}${res.lastName}${passString}`
      }
      this.registerUser(this.googleUserData);
    });
  }
  registerUser(registerUser: any) {
    // registering the user
    this.service.post('/signup', registerUser).subscribe((data: any) => {
      console.log(data);
      this.toastr.success('Registered successully!', 'Success!');
      if (data.success == false) {
        console.log(data.message);
      }
      else {
        if (data.message == "User Created") {
        }
      }
    }, (err) => {
      console.log(err.error);
      if (err.error == "Email already Exist") {
        console.log("login");
        let loginValue = {
          email: this.googleUserData.email,
          password: this.googleUserData.password
        }
        this.service.post('/login', loginValue).subscribe((data: any) => {
          console.log(data);
          this.toastr.success('login successully!', 'Success!');
          if (data) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            this.router.navigate(['feed']);
          }
        })
      }
    })
  }
  onSubmit(){
    this.submitted=true
    if (this.loginForm.invalid) {
       return;
    }
    console.log(this.loginForm.value);
     this.service.post('/login',this.loginForm.value).subscribe((data:any)=>{
      console.log(data);
    this.toastr.success('login successully!', 'Success!');

      if(data){
        localStorage.setItem("token",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
        this.router.navigate(['feed']);
      }
    })

  }

}
