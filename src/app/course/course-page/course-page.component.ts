import { Component, OnInit } from '@angular/core';
import { VideoRecord } from 'src/app/shared/models/VideoRecord.interface';
import { NgForm } from '@angular/forms';

const COURSE: VideoRecord = {
  id: 999,
  title: 'video course 999',
  creationDate: new Date(2018, 5, 15),
  duration: 100,
  description:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium soluta libero similique aperiam, velit inventore tempora sequi repudiandae sunt nesciunt!',
  topRated: false
};

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: [ './course-page.component.less' ]
})
export class CoursePageComponent implements OnInit {
  public course: VideoRecord;

  constructor() {}

  ngOnInit() {
    this.course = COURSE;
  }

  onSubmit() {
    console.log('form is submitted');
  }

  onCancel() {
    console.log('cancel is clicked');
  }
}
