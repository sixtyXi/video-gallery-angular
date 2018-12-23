import { Component, OnInit } from '@angular/core';
import { COURSES } from './mock-courses';
import { VideoRecord } from 'src/app/shared/VideoRecord';
import { OrderByPipe } from './course-item/order-by.pipe';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: [ './course-list.component.less' ]
})
export class CourseListComponent implements OnInit {
  public courses: VideoRecord[] = [];

  constructor() {}

  ngOnInit() {
    this.courses = new OrderByPipe().transform(COURSES, 'creationDate');
  }

  onLoadMore(): void {
    console.log('Load More Button');
  }

  deleteById(id: number): void {
    console.log(`${id} - deleted course's id`);
  }
}
