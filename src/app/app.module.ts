import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { LoginModule } from './login/login.module';
import { CourseModule } from './course/course.module';
import { PageNotFoundComponent } from './pageNotFound/page-not-found/page-not-found.component';
import { AuthInterceptor } from './auth-interceptor';
import { GlobalLoaderModule } from './globalLoader/globalLoader.module';
import { AuthEffects } from './core/store/effects/auth.effects';
import { CoursesEffects } from './courses/effects/courses.effects';
import { reducers, metaReducers } from './store/reducers';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [ AppComponent, PageNotFoundComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    CoursesModule,
    LoginModule,
    CourseModule,
    GlobalLoaderModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    EffectsModule.forRoot([ AuthEffects, CoursesEffects ])
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
