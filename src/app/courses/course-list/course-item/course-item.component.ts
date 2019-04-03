import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { VideoCourse } from '../../../shared/models/VideoCourse.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: [ './course-item.component.less' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input() item: VideoCourse;
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();
  @Output() onEdit: EventEmitter<number> = new EventEmitter<number>();

  constructor(public translate: TranslateService) {}

  delete(): void {
    this.onDelete.emit(this.item.id);
  }

  edit(): void {
    this.onEdit.emit(this.item.id);
  }
}
