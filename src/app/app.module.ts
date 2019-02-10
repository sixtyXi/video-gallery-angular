import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { LoginModule } from './login/login.module';
import { CourseModule } from './course/course.module';
import { PageNotFoundComponent } from './pageNotFound/page-not-found/page-not-found.component';

@NgModule({
  declarations: [ AppComponent, PageNotFoundComponent ],
  imports: [
    BrowserModule,
    CoreModule,
    CoursesModule,
    LoginModule,
    CourseModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
