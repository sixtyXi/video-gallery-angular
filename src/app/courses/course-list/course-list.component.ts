import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, from, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { VideoRecord } from 'src/app/shared/models/VideoRecord.interface';
import * as Courses from '../actions/courses.actions';
import * as fromStore from '../../store/reducers';
import { TranslateService } from '@ngx-translate/core';

const LOAD_TO_COUNT = 5;

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: [ './course-list.component.less' ]
})
export class CourseListComponent implements OnInit {
  public courses$: Observable<VideoRecord[]>;
  public filter: string = '';
  private pageNumber: number;
  private coursePerPage = LOAD_TO_COUNT;

  constructor(private store: Store<fromStore.State>, public translate: TranslateService) {}

  ngOnInit() {
    this.courses$ = this.store.select(fromStore.getCoursesList);
    this.pageNumber = 0;
    this.initList();
  }

  initList() {
    this.store.dispatch(
      new Courses.CourseListRequested({
        start: this.pageNumber,
        count: this.coursePerPage,
        textFragment: this.filter
      })
    );
  }

  onLoadMore(): void {
    this.pageNumber++;
    const start = this.pageNumber * this.coursePerPage;

    this.store.dispatch(
      new Courses.CourseListRequested({
        start,
        count: this.coursePerPage,
        textFragment: this.filter
      })
    );
  }

  deleteById(id: number): void {
    if (confirm('Do you really want to delete this course?')) {
      this.store.dispatch(new Courses.CourseDeleteRequested({ id }));
      this.initList();
    }
  }

  editById(id: number): void {
    this.store.dispatch(new Courses.CourseRequested({ id }));
  }

  filterBy(text: string): void {
    this.pageNumber = 0;
    this.filter = text;
    this.initList();
  }
}
