import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: [ './login-box.component.less' ]
})
export class LoginBoxComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logOff() {
    this.authService.logOut();
    this.router.navigate([ 'login' ]);
  }
}
