import { Component, OnInit } from '@angular/core';
import { VideoRecord } from 'src/app/shared/VideoRecord';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: [ './course-list.component.less' ]
})
export class CourseListComponent implements OnInit {
  public courses: VideoRecord[] = [];
  private filter: string = '';

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.courses = this.coursesService.getList();
  }

  onLoadMore(): void {
    console.log('Load More Button');
  }

  deleteById(id: number): void {
    if (confirm('Do you really want to delete this course?')) {
      this.coursesService.deleteCourseById(id);
    }
  }

  filterBy(text: string): void {
    this.filter = text;
  }
}
