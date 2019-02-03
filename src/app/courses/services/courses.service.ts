import { Injectable } from '@angular/core';
import { VideoRecord } from '../../shared/models/VideoRecord.interface';
import { COURSES } from '../../shared/mocks/mock-courses';
import { VideoCourse } from 'src/app/shared/models/VideoCourse.model';

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

  addCourse(course: Partial<VideoRecord>): VideoRecord {
    const { title, creationDate, duration, description, topRated } = course;
    const id = this.courses.length + 1;
    const newCourse = new VideoCourse(id, title, creationDate, duration, description, topRated);

    this.courses.push(newCourse);
    return newCourse;
  }

  getCourseById(id: number): VideoRecord {
    return this.courses.find((course) => course.id === id);
  }

  updateCourse(course: VideoRecord): void {
    for (let i = 0; i < this.courses.length; i++) {
      if (course.id === this.courses[i].id) {
        this.courses[i] = course;
        return;
      }
    }
  }

  deleteCourseById(id: number): void {
    for (let i = 0; i < this.courses.length; i++) {
      if (id === this.courses[i].id) {
        this.courses.splice(i, 1);
        return;
      }
    }
  }
}
