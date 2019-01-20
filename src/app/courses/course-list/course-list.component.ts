import { Component, OnInit } from '@angular/core';
import { COURSES } from './mock-courses';
import { VideoRecord } from 'src/app/shared/VideoRecord';
import { OrderByPipe } from './order-by.pipe';
import { FilterByTitlePipe } from './filter-by-title.pipe';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: [ './course-list.component.less' ]
})
export class CourseListComponent implements OnInit {
  private allCourses: VideoRecord[];
  public courses: VideoRecord[] = [];

  constructor() {}

  ngOnInit() {
    if (COURSES.length) {
      this.allCourses = COURSES;
      this.courses = this.allCourses.concat();
    }
  }

  onLoadMore(): void {
    console.log('Load More Button');
  }

  deleteById(id: number): void {
    console.log(`${id} - deleted course's id`);
  }

  filterByTitle(text: string): void {
    this.courses = new FilterByTitlePipe().transform(this.allCourses.concat(), text);
  }
}
