import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromAuth from '../../core/store/reducers/auth.reducer';
import * as fromCourses from '../../courses/reducers/courses.reducer';

export interface State {
  courses: fromCourses.CoursesState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<State> = {
  courses: fromCourses.reducer,
  auth: fromAuth.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getLoggedIn = createSelector(selectAuthState, fromAuth.getLoggedIn);
export const getUserLogin = createSelector(selectAuthState, fromAuth.getUserLogin);

export const selectCoursesState = createFeatureSelector<fromCourses.CoursesState>('courses');
export const getCoursesList = createSelector(selectCoursesState, fromCourses.getCoursesList);
export const getCourse = createSelector(selectCoursesState, fromCourses.getCourse);
