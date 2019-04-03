import { CoursesActionTypes, CoursesActions } from '../actions/courses.actions';
import { VideoRecord } from '../../shared/models/VideoRecord.interface';

export interface CoursesState {
  courseList: VideoRecord[];
  course: VideoRecord | null;
}

export const initialState = {
  courseList: [],
  course: null
};

export function reducer(state = initialState, action: CoursesActions) {
  switch (action.type) {
    case CoursesActionTypes.CourseListLoaded:
      return {
        ...state,
        courseList: action.payload.courseList
      };
    case CoursesActionTypes.CourseLoaded:
      return {
        ...state,
        course: action.payload.course
      };
    case CoursesActionTypes.CourseDeleteSuccess:
      return {
        ...state,
        courseList: getFilteredCourses(action.payload.id, state.courseList)
      };
    default:
      return state;
  }
}

const getFilteredCourses = (id: string | number, courses: VideoRecord[]): VideoRecord[] => {
  return courses.filter((course) => course.id.toString() !== id.toString());
};

export const getCoursesList = (state: CoursesState) => state.courseList;
export const getCourse = (state: CoursesState) => state.course;
