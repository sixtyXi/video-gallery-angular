import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesPageComponent } from './courses/courses-page/courses-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { CoursePageComponent } from './course/course-page/course-page.component';
import { PageNotFoundComponent } from './pageNotFound/page-not-found/page-not-found.component';
import { CanActivateGuard } from './shared/guards/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    component: CoursesPageComponent,
    canActivate: [ CanActivateGuard ]
  },
  {
    path: 'courses/:id',
    component: CoursePageComponent,
    canActivate: [ CanActivateGuard ]
  },
  {
    path: 'courses/new',
    component: CoursePageComponent,
    canActivate: [ CanActivateGuard ]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
