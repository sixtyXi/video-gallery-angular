import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.less' ]
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public login: string = '';
  public pwd: string = '';

  private onLoginSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin() {
    if (this.login && this.pwd) {
      this.authService.logIn(this.login, this.pwd).subscribe(
        () => {
          this.router.navigate([ '/' ]);
        },
        (error: HttpErrorResponse) => console.log(error)
      );
    }
  }

  ngOnDestroy() {
    this.onLoginSubscription && this.onLoginSubscription.unsubscribe();
  }
}
