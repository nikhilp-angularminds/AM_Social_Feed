import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'string'
})
export class StringPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
   let x=JSON.parse(value)
   return x
  }

}
