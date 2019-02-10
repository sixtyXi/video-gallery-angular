import { NgModule } from '@angular/core';
import { ControlPanelComponent } from './course-list/control-panel/control-panel.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CourseItemComponent } from './course-list/course-item/course-item.component';
import { StyleByDateDirective } from './course-list/course-item/style-by-date.directive';
import { OrderByPipe } from './course-list/order-by.pipe';
import { FilterByTitlePipe } from './course-list/filter-by-title.pipe';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ControlPanelComponent,
    CourseListComponent,
    CoursesPageComponent,
    CourseItemComponent,
    StyleByDateDirective,
    OrderByPipe,
    FilterByTitlePipe
  ],
  imports: [ SharedModule, AppRoutingModule ],
  exports: [ CoursesPageComponent ]
})
export class CoursesModule {}
