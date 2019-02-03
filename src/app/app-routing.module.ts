import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesPageComponent } from './courses/courses-page/courses-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { CoursePageComponent } from './course/course-page/course-page.component';

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesPageComponent,
  },
  { path: 'login',
    component: LoginPageComponent,
  },
  { path: 'course',
    component: CoursePageComponent
  },
  { path: '**', redirectTo: '/courses' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
