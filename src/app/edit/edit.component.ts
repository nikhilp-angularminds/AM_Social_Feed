import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editForm: FormGroup
  submitted: boolean = false
  userData: any
  img: any
  editgender: any
  formData = new FormData();

  constructor(private router: Router, private toastr: ToastrService, private service: HttpService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmobile.twitter.com%2Fihrithik&psig=AOvVaw2RUu2IlLiM_wuFCV9CS17k&ust=1651384558067000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNC5lIKNu_cCFQAAAAAdAAAAABAD",
      name: ['', Validators.required],
      bio: '',
      gender: ['', Validators.required],
      dob: '',
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['']
      // mobile:['', Validators.compose([Validators.required,Validators.pattern(
      //   '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'
      //     )])]
    })
    this.userData = localStorage.getItem("user")
    this.userData = JSON.parse(this.userData)
    console.log(this.userData)

    this.service.secureGet(`/user/${this.userData._id}`).subscribe((data: any) => {
      console.log(data);
      this.img = data.img
      this.editgender = data.gender
      console.log(this.img)
      this.editForm.patchValue({
        name: JSON.parse(data.name),
        email: JSON.parse(data.email),
        bio: JSON.parse(data.bio),
        gender: (data.gender),
        dob: data.dob,
        img: data.img,
        mobileNumber: JSON.parse(data.mobileNumber)

      })
    })
  }

  getEditData() {
    this.service.secureGet(`/user/${this.userData._id}`).subscribe((data) => {
      console.log(data);
    })
  }
  get f() {
    return this.editForm.controls;
  }

  onFileSelected(event: any) {
    this.formData.append("img", event.target.files[0]);
    console.log(event.target.files[0])
  }
  onSubmit() {
    this.submitted = true
    if (this.editForm.invalid) {
      return;
    }

    this.formData.append("name", JSON.stringify(this.editForm.value.name))
    this.formData.append("bio", JSON.stringify(this.editForm.value.bio))
    this.formData.append("gender", JSON.stringify(this.editForm.value.gender))
    this.formData.append("dob", JSON.stringify(this.editForm.value.dob))
    this.formData.append("email", JSON.stringify(this.editForm.value.email))
    this.formData.append("mobileNumber", JSON.stringify(this.editForm.value.mobileNumber))

    console.log(this.formData)
    console.log(this.editForm.value)

    this.service.put(`/edit-profile/${this.userData._id}`, this.formData).subscribe((data) => {
      console.log(data)
      this.toastr.success('Profile updated successfully!', 'Success!');
      this.router.navigate(['feed'])

      setTimeout(() => {
        this.getEditData()
      }, 2000);
    })

    this.formData.forEach((item: any) => {
      this.formData.delete(item)
      console.log(item);
    })

  }
}
  //  http://localhost:3000/edit-profile/626cc04c1107b517a446d192