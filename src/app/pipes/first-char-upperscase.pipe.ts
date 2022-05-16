import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstCharUpperscase'
})
export class FirstCharUpperscasePipe implements PipeTransform {

  transform(value: string): string {
    const firstCharUpperscase = value.charAt(0).toUpperCase();
    const subStr = value.substring(1);
    return firstCharUpperscase+subStr;
  }

}
