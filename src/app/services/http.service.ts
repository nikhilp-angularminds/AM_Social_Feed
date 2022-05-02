import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl=environment.baseUrl
  header:any
  token:any
  constructor(private http:HttpClient) {
    this.token=localStorage.getItem("token")
    // this.header={
    //   "auth-token":this.token
    //  }
   }
  
  post(url:string,payload:any){
    return this.http.post(`${this.baseUrl}${url}`,payload)
  }

  securePost(url:string,payload:any){
    const headers = { 'Authorization': this.token }
    return this.http.post(`${this.baseUrl}${url}`,payload,{ headers })

  }
  
  secureGet(url:any){
    const headers = { 'Authorization': this.token }
    return this.http.get(`${this.baseUrl}${url}`,{ headers })
  }

  put(url:string,payload:any){
    const headers = { 'Authorization': this.token }
    return this.http.put(`${this.baseUrl}${url}`,payload,{ headers })
  }
  patch(url:string,payload:any){
    const headers = { 'Authorization': this.token }
   
    return this.http.patch(`${this.baseUrl}${url}`,payload,{headers})
  }
  

}
