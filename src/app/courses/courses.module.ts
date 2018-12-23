import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlPanelComponent } from './course-list/control-panel/control-panel.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CourseItemComponent } from './course-list/course-item/course-item.component';
import { StyleByDateDirective } from './course-list/course-item/style-by-date.directive';
import { FormatDurationPipe } from './course-list/course-item/format-duration.pipe';
import { OrderByPipe } from './course-list/order-by.pipe';
import { FilterByTitlePipe } from './course-list/filter-by-title.pipe';

@NgModule({
  declarations: [ControlPanelComponent, CourseListComponent, CoursesPageComponent, CourseItemComponent, StyleByDateDirective, FormatDurationPipe, OrderByPipe, FilterByTitlePipe],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CoursesPageComponent]
})
export class CoursesModule { }
