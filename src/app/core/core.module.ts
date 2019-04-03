import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LogoComponent } from './header/logo/logo.component';
import { LoginBoxComponent } from './header/login-box/login-box.component';
import { AppRoutingModule } from '../app-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    LogoComponent,
    LoginBoxComponent
  ],
  imports: [ CommonModule, AppRoutingModule, TranslateModule ],
  exports: [ HeaderComponent, FooterComponent, BreadcrumbsComponent ]
})
export class CoreModule {}
