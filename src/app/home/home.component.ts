import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
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
  constructor(private router: Router, private service: HttpService) { }

  ngOnInit(): void {
    // ?page=1&limit=2
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
    console.log(this.userData)
  }
 
  getAllPost(){
    this.service.secureGet("?page=1&limit=20").subscribe((data: any) => {
      console.log(data)
      this.postArr = data.results
      this.postArr=this.postArr.reverse()
      console.log(this.postArr);
    }, (err) => {
      console.log(err)
    })
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
