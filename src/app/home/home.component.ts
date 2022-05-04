import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, pipe } from 'rxjs';
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
  image:any
  isLoading:boolean=false
  notEmptyPost = true;
  notscrolly = true;
  constructor(private toastr: ToastrService,private router: Router, private service: HttpService) { }

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Success!');
  // }
  ngOnInit(): void {
    // ?page=1&limit=2
    this.isLoading=true

    console.log(this.likes)
    if (this.likes === 1) {
      this.like = true
    }
    else if (this.likes === 0) {
      this.like = false
    }
    this.getAllPost();
    this.userData = localStorage.getItem("user")
    this.userData = JSON.parse(this.userData)
    this.userName=this.userData.name
    console.log(this.userData)
    this.getEditData();
  }
  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      this.notscrolly = false;
      // this.loadNextPost();
     }
  }
    getEditData(){
    this.service.secureGet(`/user/${this.userData._id}`).subscribe((data:any)=>{
         console.log(data);
        if(data){
          this.image=data.img
          this.userName=JSON.parse(data.name)
          console.log(this.image)
          console.log(this.userName)
        }
       })
     }
 
  getAllPost(){
    setTimeout(()=>{
      this.service.secureGet("?page=1&limit=20").subscribe((data: any) => {
        console.log(data)
        this.postArr = data.results
        this.postArr=this.postArr.reverse()
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
      if (this.likes == undefined) {
        this.likes = 0
        console.log(this.likes)
      }

      if (this.likes === 1) {
        this.like = true
      }
      else {
        this.like = false
      }
      console.log(this.likes)
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
      this.getAllPost();
      // this.hideCard=!this.hideCard

    })

  }
}
