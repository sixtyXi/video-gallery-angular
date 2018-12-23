import { Pipe, PipeTransform } from '@angular/core';
import { VideoRecord } from 'src/app/shared/VideoRecord';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courses: VideoRecord[], prop: string): VideoRecord[] {
    let compareFunction = null;

    if (prop === 'creationDate') {
      compareFunction = (firstCourse, secondCourse) => firstCourse.creationDate - secondCourse.creationDate;
    }

    compareFunction && courses.sort(compareFunction);

    return courses;
  }

}
