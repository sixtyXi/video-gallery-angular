import { Injectable } from '@angular/core';
import { VideoRecord } from '../../shared/models/VideoRecord.interface';
import { VideoCourse } from 'src/app/shared/models/VideoCourse.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { VideoCourseBackend } from './VideoCourseBackend.interface';
import { GlobalLoaderService } from 'src/app/globalLoader/global-loader.service';

const BASE_URL = 'http://localhost:3004/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public courses: VideoRecord[] = [];

  constructor(private http: HttpClient, private globalLoaderService: GlobalLoaderService) {}

  getList(
    start: string | number,
    count: string | number,
    textFragment: string
  ): Observable<VideoRecord[]> {
    this.globalLoaderService.runLoading();
    return this.http
      .get(BASE_URL, {
        params: {
          start: `${start}`,
          count: `${count}`,
          textFragment
        }
      })
      .pipe(
        tap(() => this.globalLoaderService.stopLoading()),
        map((response: VideoCourseBackend[]) => response.map(this.mapToCourse)),
        catchError((err) => this.handleError(err))
      );
  }

  addCourse(course: Partial<VideoRecord>): Observable<VideoCourse> {
    const newCourse = this.mapToCourseBE(course);

    this.globalLoaderService.runLoading();
    return this.http
      .post(`${BASE_URL}`, newCourse)
      .pipe(
        tap(() => this.globalLoaderService.stopLoading()),
        map(this.mapToCourse),
        catchError((err) => this.handleError(err))
      );
  }

  getCourseById(id: string | number): Observable<VideoRecord> {
    this.globalLoaderService.runLoading();
    return this.http
      .get(`${BASE_URL}/${id}`)
      .pipe(
        tap(() => this.globalLoaderService.stopLoading()),
        map((response: VideoCourseBackend) => this.mapToCourse(response)),
        catchError((err) => this.handleError(err))
      );
  }

  updateCourse(courseId: string | number, course: Partial<VideoRecord>): Observable<VideoCourse> {
    const updatedCourse = this.mapToCourseBE(course);

    this.globalLoaderService.runLoading();
    return this.http
      .patch(`${BASE_URL}/${courseId}`, updatedCourse)
      .pipe(
        tap(() => this.globalLoaderService.stopLoading()),
        map(this.mapToCourse),
        catchError((err) => this.handleError(err))
      );
  }

  deleteCourseById(id: string | number) {
    this.globalLoaderService.runLoading();
    return this.http
      .delete(`${BASE_URL}/${id}`)
      .pipe(
        tap(() => this.globalLoaderService.stopLoading()),
        catchError((err) => this.handleError(err))
      );
  }

  private mapToCourse(item: VideoCourseBackend) {
    return new VideoCourse(
      item.id,
      item.name,
      new Date(item.date),
      item.length,
      item.description,
      item.isTopRated
    );
  }

  private mapToCourseBE(item: Partial<VideoRecord>): VideoCourseBackend {
    return {
      id: item.id,
      name: item.title,
      date: item.creationDate.toISOString(),
      length: item.duration,
      description: item.description,
      isTopRated: item.topRated
    };
  }

  private handleError(error: HttpErrorResponse) {
    this.globalLoaderService.stopLoading();

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
