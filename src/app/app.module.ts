import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { CoursesService } from './services/courses.service';
import { AuthService } from './services/auth.service';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule, AppRoutingModule, CoreModule, CoursesModule, LoginModule ],
  providers: [ CoursesService, AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
