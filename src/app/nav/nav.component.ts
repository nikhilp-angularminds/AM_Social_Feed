import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  closeResult = '';
  addPostForm:FormGroup
  submitted:boolean=false
  imageError:any;
    isImageSaved: boolean;
    cardImageBase64: string;
 userData:any
  constructor( private fb: FormBuilder,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.addPostForm = this.fb.group({
      file: ['',Validators.required],
      caption: ['',Validators.required],
    
    });
    this.userData= localStorage.getItem("user")
    this.userData=JSON.parse(this.userData)
    console.log(this.userData)
  }
  get f(){
    return this.addPostForm.controls;
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
  base64textString:any = [];

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  handleReaderLoaded(e:any) {
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }

  onSubmit(){
    this.submitted=true
    if (this.addPostForm.invalid) {
       return;
    }
    console.log(this.addPostForm.value);
   }
}
