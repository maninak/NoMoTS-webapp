import { Pipe, PipeTransform } from '@angular/core';


/**
 * Allows *ngFor iteration of objects
 * @returns an object containing a key and value member respectively
 */
@Pipe({
  name: 'objectKeyValue',
  // Change pure to false if object data can change at runtime.
  // WARNING: performance hog as angular has to change detect it's insides every time
  pure: true,
})
export class ObjectKeyValuePipe implements PipeTransform {
  transform(value: {}, args: string[]): {} {
    let keyvalues: Array<{}> = [];
    for (let key in value) {
      keyvalues.push({key: key, value: value[key]});
    }
    return keyvalues;
  }
}
