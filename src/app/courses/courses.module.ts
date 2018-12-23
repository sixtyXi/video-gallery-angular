import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CourseItemComponent } from './course-list/course-item/course-item.component';
import { StyleByDateDirective } from './course-list/course-item/style-by-date.directive';

@NgModule({
  declarations: [ControlPanelComponent, CourseListComponent, CoursesPageComponent, CourseItemComponent, StyleByDateDirective],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [CoursesPageComponent]
})
export class CoursesModule { }
