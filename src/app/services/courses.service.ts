import { Injectable } from '@angular/core';
import { VideoRecord } from '../shared/VideoRecord';
import { COURSES } from './mock-courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public courses: VideoRecord[] = [];
  constructor() {
    this.courses = COURSES;
  }

  getList(): VideoRecord[] {
    return this.courses;
  }

  addCourse(course: VideoRecord): void {
    this.courses.push(course);
  }

  getCourseById(id: number): VideoRecord {
    return this.courses.find(course => course.id === id);
  }

  updateCourse(course: VideoRecord): void {
    for (let i = 0; i < this.courses.length; i++) {
      if(course.id === this.courses[i].id) {
        this.courses[i] = course;
        return;
      }
    }
  }

  deleteCourseById(id: number): void {
    for (let i = 0; i < this.courses.length; i++) {
      if(id === this.courses[i].id) {
        this.courses.splice(i, 1);
        return;
      }
    }
  }
}
