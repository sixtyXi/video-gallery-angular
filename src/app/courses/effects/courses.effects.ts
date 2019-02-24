import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { CoursesService } from '../services/courses.service';
import {
  CourseListRequested,
  CourseListLoaded,
  CourseFailure,
  CourseRequested,
  CourseLoaded,
  CoursesActionTypes,
  CourseUpdateRequested,
  CourseAddRequested,
  CourseDeleteRequested,
  CourseDeleteSuccess
} from '../actions/courses.actions';
import { VideoRecord } from 'src/app/shared/models/VideoRecord.interface';

@Injectable()
export class CoursesEffects {
  constructor(
    private coursesService: CoursesService,
    private actions$: Actions,
    private router: Router
  ) {}

  @Effect()
  courseListRequested$ = this.actions$.pipe(
    ofType(CoursesActionTypes.CourseListRequested),
    map((action: CourseListRequested) => action.payload),
    exhaustMap(({ start, count, textFragment }) =>
      this.coursesService
        .getList(start, count, textFragment)
        .pipe(
          map((courseList: VideoRecord[]) => new CourseListLoaded({ courseList })),
          catchError((error) => of(new CourseFailure(error)))
        )
    )
  );

  @Effect()
  courseRequested$ = this.actions$.pipe(
    ofType(CoursesActionTypes.CourseRequested),
    map((action: CourseRequested) => action.payload.id),
    exhaustMap((id) =>
      this.coursesService
        .getCourseById(id)
        .pipe(
          map((course: VideoRecord) => new CourseLoaded({ course })),
          tap(() => this.router.navigate([ 'courses', id ])),
          catchError((error) => of(new CourseFailure(error)))
        )
    )
  );

  @Effect()
  courseUpdateRequested$ = this.actions$.pipe(
    ofType(CoursesActionTypes.CourseUpdateRequested),
    map((action: CourseUpdateRequested) => action.payload),
    exhaustMap(({ courseId, course }) =>
      this.coursesService
        .updateCourse(courseId, course)
        .pipe(
          map((course: VideoRecord) => new CourseLoaded({ course })),
          tap(() => this.router.navigate([ 'courses' ])),
          catchError((error) => of(new CourseFailure(error)))
        )
    )
  );

  @Effect()
  courseAddRequested$ = this.actions$.pipe(
    ofType(CoursesActionTypes.CourseAddRequested),
    map((action: CourseAddRequested) => action.payload.course),
    exhaustMap((course) =>
      this.coursesService
        .addCourse(course)
        .pipe(
          map((course: VideoRecord) => new CourseLoaded({ course })),
          tap(() => this.router.navigate([ 'courses' ])),
          catchError((error) => of(new CourseFailure(error)))
        )
    )
  );

  @Effect()
  courseDeleteRequested$ = this.actions$.pipe(
    ofType(CoursesActionTypes.CourseDeleteRequested),
    map((action: CourseDeleteRequested) => action.payload.id),
    exhaustMap((id) =>
      this.coursesService
        .deleteCourseById(id)
        .pipe(
          map(() => new CourseDeleteSuccess({ id })),
          catchError((error) => of(new CourseFailure(error)))
        )
    )
  );
}
