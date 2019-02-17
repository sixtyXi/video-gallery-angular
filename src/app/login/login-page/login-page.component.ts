import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.less' ]
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public login: string = '';
  public pwd: string = '';

  private ngUnsubscribe = new Subject();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin() {
    if (this.login && this.pwd) {
      this.authService.logIn(this.login, this.pwd).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        () => {
          this.router.navigate([ '/' ]);
        },
        (error: HttpErrorResponse) => console.log(error)
      );
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
