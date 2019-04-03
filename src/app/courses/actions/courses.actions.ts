import { Action } from '@ngrx/store';
import { VideoRecord } from '../../shared/models/VideoRecord.interface';

export enum CoursesActionTypes {
  CourseListRequested = '[Courses Page] CourseListRequested',
  CourseListLoaded = '[Courses Service] CourseListLoaded',
  CourseFailure = '[Courses Service] CourseFailure',
  CourseRequested = '[Courses Page] CourseRequested',
  CourseLoaded = '[Courses Service] CourseLoaded',
  CourseUpdateRequested = '[Course Page] CoursUpdateRequested',
  CourseAddRequested = '[Course Page] CourseAddRequested',
  CourseDeleteRequested = '[Course Page] CourseDeleteRequested',
  CourseDeleteSuccess = '[Course Effects] CourseDeleteSuccess'
}

export class CourseListRequested implements Action {
  readonly type = CoursesActionTypes.CourseListRequested;

  constructor(
    public payload: {
      start: string | number;
      count: string | number;
      textFragment: string;
    }
  ) {}
}

export class CourseListLoaded implements Action {
  readonly type = CoursesActionTypes.CourseListLoaded;

  constructor(public payload: { courseList: VideoRecord[] }) {}
}

export class CourseFailure implements Action {
  readonly type = CoursesActionTypes.CourseFailure;

  constructor(public payload: any) {}
}

export class CourseRequested implements Action {
  readonly type = CoursesActionTypes.CourseRequested;

  constructor(public payload: { id: number | string }) {}
}

export class CourseLoaded implements Action {
  readonly type = CoursesActionTypes.CourseLoaded;

  constructor(public payload: { course: VideoRecord }) {}
}

export class CourseUpdateRequested implements Action {
  readonly type = CoursesActionTypes.CourseUpdateRequested;

  constructor(public payload: { courseId: number | string; course: Partial<VideoRecord> }) {}
}

export class CourseAddRequested implements Action {
  readonly type = CoursesActionTypes.CourseAddRequested;

  constructor(public payload: { course: Partial<VideoRecord> }) {}
}

export class CourseDeleteRequested implements Action {
  readonly type = CoursesActionTypes.CourseDeleteRequested;

  constructor(public payload: { id: number | string }) {}
}

export class CourseDeleteSuccess implements Action {
  readonly type = CoursesActionTypes.CourseDeleteSuccess;

  constructor(public payload: { id: number | string }) {}
}

export type CoursesActions =
  | CourseListRequested
  | CourseListLoaded
  | CourseFailure
  | CourseRequested
  | CourseLoaded
  | CourseUpdateRequested
  | CourseAddRequested
  | CourseDeleteRequested
  | CourseDeleteSuccess;
