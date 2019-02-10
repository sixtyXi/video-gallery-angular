import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoRecord } from 'src/app/shared/models/VideoRecord.interface';
import { CoursesService } from '../services/courses.service';
import { Subscription } from 'rxjs';

const LOAD_TO_COUNT = 5;

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: [ './course-list.component.less' ]
})
export class CourseListComponent implements OnInit, OnDestroy {
  public courses: VideoRecord[] = [];
  public filter: string = '';
  private pageNumber: number;
  private coursePerPage = LOAD_TO_COUNT;

  private coursesSubscription: Subscription;
  private courseDeleteSubscribtion: Subscription;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.pageNumber = 0;
    this.getList(`${this.pageNumber}`, `${this.coursePerPage}`, this.filter);
  }

  getList(start: string, count: string, textFragment: string): void {
    this.coursesSubscription = this.coursesService
      .getList(start, count, textFragment)
      .subscribe((res: VideoRecord[]) => (this.courses = res));
  }

  onLoadMore(): void {
    this.pageNumber++;
    const start = this.pageNumber * this.coursePerPage;

    this.getList(`${start}`, `${this.coursePerPage}`, this.filter);
  }

  deleteById(id: number): void {
    if (confirm('Do you really want to delete this course?')) {
      this.courseDeleteSubscribtion = this.coursesService
        .deleteCourseById(`${id}`)
        .subscribe(() => this.init());
    }
  }

  filterBy(text: string): void {
    this.filter = text;
    this.init();
  }

  ngOnDestroy() {
    this.coursesSubscription && this.coursesSubscription.unsubscribe();
    this.courseDeleteSubscribtion && this.courseDeleteSubscribtion.unsubscribe();
  }
}
