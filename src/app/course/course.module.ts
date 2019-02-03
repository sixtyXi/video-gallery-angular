import { NgModule } from '@angular/core';
import { CoursePageComponent } from './course-page/course-page.component';
import { DateFieldComponent } from './course-page/date-field/date-field.component';
import { DurationFieldComponent } from './course-page/duration-field/duration-field.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ CoursePageComponent, DateFieldComponent, DurationFieldComponent ],
  imports: [ SharedModule ]
})
export class CourseModule {}
