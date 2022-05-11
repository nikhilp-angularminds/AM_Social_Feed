import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

import { catchError, pipe } from 'rxjs';
import { AppService } from '../services/app.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  postArr: any
  userData: any
  hideCard: boolean = false
  likes: any = 0
  like: boolean = false
  id: any
  index1: any
  userName:any
  name:any
  image:any
  isLoading:boolean=false
  notEmptyPost = true;
  notscrolly = true;
  userId:any
  closeResult = '';
  sum = 20;
  constructor(private appService:AppService,private modalService: NgbModal,private toastr: ToastrService,private router: Router, private service: HttpService) { }

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Success!');
  // }
  ngOnInit(): void {
    this.appService.subject.subscribe(
      data => 
      {
        console.log('next subscribed value: ' +  data);
        this.postArr = data;
      }
    );
    this.getAllPost();

    this.isLoading=true

    console.log(this.likes)
    if (this.likes === 1) {
      this.like = true
    }
    else if (this.likes === 0) {
      this.like = false
    }
    this.userData = localStorage.getItem("user")
    this.userData = JSON.parse(this.userData)
    this.userName=this.userData.name
    this.userId=this.userData._id
    console.log(this.userData)
    this.getUserData();
  }
  onScrollDown(ev: any) {
    console.log("scrolled down!!", ev);

    this.sum += 20;
    this.appendItems();
    
  }

  appendItems() {
    this.addItems("push");
  }
  addItems(_method: string) {
    for (let i = 0; i < this.sum; ++i) {
      if( _method === 'push'){
        this.postArr.push([i].join(""));
      }else if( _method === 'unshift'){
        this.postArr.unshift([i].join(""));
      }
    }
  }
    getUserData(){
    this.service.secureGet(`/user/${this.userData._id}`).subscribe((data:any)=>{
         console.log(data);
        if(data){
          this.image=data.img
          this.name=JSON.parse(data.name)
          console.log(this.name)
        }
       })
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
  
  
 
  getAllPost(){
    setTimeout(()=>{
      this.service.secureGet("?page=1&limit=20").subscribe((data: any) => {
        console.log(data)
        this.postArr = data.results
        this.postArr=this.postArr.reverse()
        this.postArr.map((res:any)=>{
         
              if(res.likes.includes(this.userData._id)){
                   res["like"]=true
              }
              else{
                res["like"]=false
                 
              }
        })
        console.log(this.postArr);
      }, (err) => {
        console.log(err)
      })
    },1000)
    setTimeout(()=>{
      this.isLoading=true
    },2000)
    setTimeout(()=>{
      this.isLoading=false
    },3000)
  }
  onLikes(index: any) {
    // console.log(index)
    this.service.put(`/${this.postArr[index]._id}/like`, { "userId": this.userData._id }).subscribe((data: any) => {
      console.log(data)
      console.log(this.postArr[index]._id)
      this.id = data._id
      if (this.postArr[index]._id == this.id) {

      }
      this.likes = data.likes?.length
      console.log(this.likes)

      if (data.message=="The post has been disliked") {
       this.likes= data.postInfo.likes.length
       this.id =data.postInfo._id
       this.like=false
       console.log(this.likes)
      }

      if (data.likes.includes(this.userData._id) ) {
        this.like = true
      }
      else {
        this.like = false
      }
    })

    // 626ceebd77198639072eeadb/like 

  }
  hide(i: any) {
    this.index1 = i
    this.hideCard = !this.hideCard
  }
  addComment(comment: any, index: any) {
    let payload = {
      "userId": this.userData._id,
      "comment": comment
    }
    console.log(payload)
    this.service.put(`/${this.postArr[index]._id}/comment`, payload).subscribe((data: any) => {
      console.log(data)
      this.service.secureGet("?page=1&limit=20").subscribe((data: any) => {
        console.log(data)
        this.postArr = data.results
        this.postArr=this.postArr.reverse()
        this.postArr.map((res:any)=>{
         
              if(res.likes.includes(this.userData._id)){
                   res["like"]=true
              }
              else{
                res["like"]=false
                 
              }
        })
      })
   })

  }
}
