import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl=environment.baseUrl
  constructor(private http:HttpClient) { }

  post(url:string,payload:any){
    return this.http.post(`${this.baseUrl}${url}`,payload)
  }
}
