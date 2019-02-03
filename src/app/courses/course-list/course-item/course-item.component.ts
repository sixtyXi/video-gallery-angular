import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { VideoCourse } from '../../../shared/models/VideoCourse.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: [ './course-item.component.less' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input() item: VideoCourse;
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  click(): void {
    this.onDelete.emit(this.item.id);
  }
}
