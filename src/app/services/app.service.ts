import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
  public subject = new Subject<string>();

  passValue(data:any) {
    //passing the data as the next observable
    this.subject.next(data);
  }

}
