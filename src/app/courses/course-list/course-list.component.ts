import { Component, OnInit } from '@angular/core';
import { COURSES } from './mock-courses';
import { VideoRecord } from 'src/app/shared/VideoRecord';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: [ './course-list.component.less' ]
})
export class CourseListComponent implements OnInit {
  public courses: VideoRecord[] = [];

  constructor() {}

  ngOnInit() {
    this.courses = COURSES;
  }

  onLoadMore(): void {
    console.log('Load More Button');
  }

  deleteById(id: number): void {
    console.log(`${id} - deleted course's id`);
  }
}
