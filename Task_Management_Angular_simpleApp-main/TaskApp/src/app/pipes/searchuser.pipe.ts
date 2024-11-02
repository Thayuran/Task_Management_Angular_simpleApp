import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../user.model';

@Pipe({
  name: 'searchuser'
})
export class SearchuserPipe implements PipeTransform {


  transform(value: User[], ...args: string[]): User[] {
    let search=args[0];

    return value.filter(s=>s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()));
  }

}
