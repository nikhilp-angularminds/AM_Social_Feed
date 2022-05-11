import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'string1'
})
export class String1Pipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    let x=JSON.parse(value)
    return x=JSON.parse(x)
   }

}
