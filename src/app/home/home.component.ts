import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  postArr:any
  userData:any
  constructor(private service:HttpService) { }

  ngOnInit(): void {
    // ?page=1&limit=2
   this.service.secureGet("?page=1&limit=10").subscribe((data:any)=>{
      console.log(data)
      this.postArr=data.results
    })
    this.userData= localStorage.getItem("user")
    this.userData=JSON.parse(this.userData)
    console.log(this.userData)
  }
 
  onLikes(index:any){
    console.log(index)
    this.service.put(`/${this.postArr[index]._id}/like`,this.userData._id).subscribe((data)=>{
      console.log(data)
    })
    // 626ceebd77198639072eeadb/like

  }
}
