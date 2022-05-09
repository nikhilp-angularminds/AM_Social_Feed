import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { Route, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { ReadVarExpr } from '@angular/compiler';
import { HttpService } from '../services/http.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  closeResult = '';
  addPostForm: FormGroup
  changePassForm: FormGroup
  submitted: boolean = false
  imageError: any;
  isImageSaved: boolean;
  cardImageBase64: string;
  userData: any
  base64Output: string;
  imagesrc: any
  formData = new FormData();
  img: any
  postArr: any
  passErr: any
  imgage: any
  ediName: any
  password: boolean = false
  constructor(private toastr: ToastrService, private http: HttpClient, private service: HttpService, private router: Router, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userData = localStorage.getItem("user")
    this.userData = JSON.parse(this.userData)
    console.log(this.userData)
    this.addPostForm = this.fb.group({
      img: ['', Validators.required],
      caption: ['', Validators.required],
      userId: [this.userData._id],
      userName: this.userData.name

    });
    this.changePassForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
    this.getEditData()
  }
  getEditData() {
    this.service.secureGet(`/user/${this.userData._id}`).subscribe((data: any) => {
      console.log(data);
      this.imgage = data.img
      this.ediName = data.name
      console.log(this.imgage)
      console.log(this.ediName)

    })
  }
  get f() {
    return this.addPostForm.controls;
  }
  get c() {
    return this.changePassForm.controls;
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onFileSelected(event: any) {
    
    this.formData.append("img", event.target.files[0]);
    console.log(event.target.files[0])
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login'])
  }
  getAllData() {
    this.service.secureGet("?page=1&limit=20").subscribe((data: any) => {
      console.log(data)
      this.postArr = data.results
      this.postArr = this.postArr.reverse()

    })
  }
  addPost() {
    this.submitted = true
    if (this.addPostForm.invalid) {
      return;
    }
    this.formData.append("caption", JSON.stringify(this.addPostForm.value.caption))
    this.formData.append("userId", this.addPostForm.value.userId)
    this.formData.append("userName", JSON.stringify(this.addPostForm.value.userName))

    this.service.securePost("/uploadImage", this.formData).subscribe((data) => {
      console.log(data)
      this.toastr.success('New post added successfully!', 'Success!');
    })

    console.log(this.addPostForm.value);
    this.submitted = false
  }

  changePass() {
    this.submitted = true
    if (this.changePassForm.invalid) {
      return;
      // /changePassword
    }
    console.log(this.changePassForm.value);
    this.service.put(`/changePassword/${this.userData._id}`, this.changePassForm.value).subscribe((data) => {
      console.log(data);
      this.toastr.success('password changed successfully!', 'Success!');

      this.password = false
    }, (err) => {
      if (err.error) {
        this.passErr = err.error
         console.log(err)
        this.password = true
      }
    })
  }
}

