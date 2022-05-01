import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
   editForm:FormGroup
   submitted:boolean=false
   userData:any
  constructor(private service:HttpService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.editForm=this.fb.group({
      img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmobile.twitter.com%2Fihrithik&psig=AOvVaw2RUu2IlLiM_wuFCV9CS17k&ust=1651384558067000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNC5lIKNu_cCFQAAAAAdAAAAABAD",
      name:['',Validators.required],
      bio:'',
      gender: ['',Validators.required],
      dob:'',
      email: ['',[Validators.required,Validators.email]],
      mobile:['', Validators.compose([Validators.required,Validators.pattern(
        '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'
          )])]
    })
    this.userData= localStorage.getItem("user")
    this.userData=JSON.parse(this.userData)
    console.log(this.userData)
  }
  get f(){
    return this.editForm.controls;
  }

  onSubmit(){
   this.submitted=true
   if (this.editForm.invalid) {
    return;
  }
  this.editForm.patchValue({
    mobile:parseInt(this.editForm.value.mobile)
  })
  console.log(this.editForm.value)
  this.service.put(`/edit-profile/${this.userData._id}`,this.editForm.value).subscribe((data)=>{
    console.log(data)
  })
  //  http://localhost:3000/edit-profile/626cc04c1107b517a446d192
  }

}
