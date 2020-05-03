import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';

@Pipe({
  name: 'urlFriendly'
})
export class URLFriendlyPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    let newValue: string;
    newValue = value.toLowerCase().replace(/ /g, '-')
    return newValue;
  }  
}
