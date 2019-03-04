import { NgModule } from '@angular/core';
import { CoursePageComponent } from './course-page/course-page.component';
import { DateFieldComponent } from './course-page/date-field/date-field.component';
import { DurationFieldComponent } from './course-page/duration-field/duration-field.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthorsFieldComponent } from './course-page/authors-field/authors-field.component';

@NgModule({
  declarations: [ CoursePageComponent, DateFieldComponent, DurationFieldComponent, AuthorsFieldComponent ],
  imports: [ SharedModule, ReactiveFormsModule ],
  providers: [ DatePipe ]
})
export class CourseModule {}
