import { Pipe, PipeTransform } from '@angular/core';
import { VideoRecord } from 'src/app/shared/VideoRecord';

@Pipe({
  name: 'filterByTitle',
  pure: false
})
export class FilterByTitlePipe implements PipeTransform {

  transform(courses: VideoRecord[], text: string): VideoRecord[] {
    return courses.filter(course => course.title.toLowerCase().indexOf(text.toLowerCase()) > -1);
  }
}
