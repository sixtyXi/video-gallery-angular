import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: [ './login-box.component.less' ]
})
export class LoginBoxComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  logOff() {
    this.authService.logOut();
    console.log('user logged out');
  }
}
