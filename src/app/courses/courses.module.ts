import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';

@NgModule({
  declarations: [ControlPanelComponent, CourseListComponent, CoursesPageComponent],
  imports: [
    CommonModule
  ],
  exports: [CoursesPageComponent]
})
export class CoursesModule { }
