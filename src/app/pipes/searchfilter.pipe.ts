import { Pipe, PipeTransform, Injectable } from '@angular/core';


@Pipe({
  name: 'searchfilter'
})

@Injectable()
export class SearchfilterPipe implements PipeTransform {

  transform(students: any[], field: string, value: string): any[] {
    if (!students) return [];
    return students.filter(it => it[field] == value);
    }
  }
