import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {
  public login: string = '';
  public pwd: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    if (this.login && this.pwd) {
      this.authService.logIn(this.login, this.pwd);
      console.log('logged in successfully');
    }
  }
}
