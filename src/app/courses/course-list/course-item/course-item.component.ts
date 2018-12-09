import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VideoCourse } from '../../../shared/VideoCourse.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.less']
})
export class CourseItemComponent implements OnInit {

  @Input() item: VideoCourse;
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();

  formattedDate: string;
  formattedDuration: string;

  constructor() { }

  ngOnInit() {
    this.formattedDate = this.getFormattedDate(this.item.creationDate);
    this.formattedDuration = this.getFormattedDuration(this.item.duration);
  }

  getFormattedDate(dateObj: Date): string {
    const month: number = dateObj.getUTCMonth();
    const date: number = dateObj.getUTCDate();
    const year: number = dateObj.getUTCFullYear()

    return `${month}.${date}.${year}`;
  }

  getFormattedDuration(allMinutes: number): string {
    const hours: number = Math.floor(allMinutes / 60);
    const minutes: number = allMinutes % 60;
    let formattedDuration: string = '';

    if (hours) {
      formattedDuration += `${hours}h `
    }

    if (minutes) {
      formattedDuration += `${minutes}min`
    }
    
    return formattedDuration;
  }

  delete() {
    this.onDelete.emit(this.item.id);
  }

}
