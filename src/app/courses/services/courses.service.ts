import { Injectable } from '@angular/core';
import { VideoRecord } from '../../shared/models/VideoRecord.interface';
import { VideoCourse } from 'src/app/shared/models/VideoCourse.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { VideoCourseBackend } from './VideoCourseBackend.interface';

const BASE_URL = 'http://localhost:3004/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public courses: VideoRecord[] = [];

  constructor(private http: HttpClient) {}

  getList(start: string, count: string, textFragment: string): Observable<VideoRecord[]> {
    return this.http
      .get(BASE_URL, { params: { start, count, textFragment } })
      .pipe(
        map((response: VideoCourseBackend[]) => response.map(this.mapToCourse)),
        catchError(this.handleError)
      );
  }

  addCourse(course: Partial<VideoRecord>): Observable<VideoCourse> {
    const newCourse = this.mapToCourseBE(course);

    return this.http
      .post(`${BASE_URL}`, newCourse)
      .pipe(map(this.mapToCourse), catchError(this.handleError));
  }

  getCourseById(id: string | number): Observable<VideoRecord> {
    return this.http
      .get(`${BASE_URL}/${id}`)
      .pipe(
        map((response: VideoCourseBackend) => this.mapToCourse(response)),
        catchError(this.handleError)
      );
  }

  updateCourse(course: VideoRecord): Observable<VideoCourse> {
    const updatedCourse = this.mapToCourseBE(course);

    return this.http
      .patch(`${BASE_URL}/${updatedCourse.id}`, updatedCourse)
      .pipe(map(this.mapToCourse), catchError(this.handleError));
  }

  deleteCourseById(id: string | number) {
    return this.http.delete(`${BASE_URL}/${id}`).pipe(catchError(this.handleError));
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
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
