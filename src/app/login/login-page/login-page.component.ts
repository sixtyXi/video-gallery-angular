import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.less' ]
})
export class LoginPageComponent implements OnInit {
  public login: string = '';
  public pwd: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin() {
    if (this.login && this.pwd) {
      this.authService.logIn(this.login, this.pwd);
      this.router.navigate([ '/' ]);
      console.log('logged in successfully');
    }
  }
}
