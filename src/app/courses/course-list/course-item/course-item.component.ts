import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VideoCourse } from '../../../shared/VideoCourse.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: [ './course-item.component.less' ]
})
export class CourseItemComponent implements OnInit {
  @Input() item: VideoCourse;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  formattedDuration: string;

  constructor() {}

  ngOnInit() {
    this.formattedDuration = this.getFormattedDuration(this.item.duration);
  }

  getFormattedDuration(allMinutes: number): string {
    const hours: number = Math.floor(allMinutes / 60);
    const minutes: number = allMinutes % 60;
    let formattedDuration: string = '';

    if (hours) {
      formattedDuration += `${hours}h `;
    }

    if (minutes) {
      formattedDuration += `${minutes}min`;
    }

    return formattedDuration;
  }

  click(): void {
    this.delete.emit(this.item.id);
  }
}
