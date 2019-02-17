import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { Person } from 'src/app/shared/models/Person.interface';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: [ './login-box.component.less' ]
})
export class LoginBoxComponent implements OnInit, OnDestroy {
  public userLogin = '';
  private ngUnsubscribe = new Subject();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd), takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (this.authService.isAuth() && !this.userLogin) {
          const id = localStorage.getItem('id');

          this.authService
            .getUserInfo(id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((res: Person) => {
              this.userLogin = res.login;
            });
        }
      });
  }

  logOff() {
    this.userLogin = '';
    this.authService.logOut();
    this.router.navigate([ 'login' ]);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
