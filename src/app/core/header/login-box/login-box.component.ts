import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as Auth from '../../actions/auth';
import * as fromStore from '../../../store/reducers';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: [ './login-box.component.less' ]
})
export class LoginBoxComponent implements OnInit, OnDestroy {
  public userLogin$: Observable<string>;
  public isAuth$: Observable<boolean>;
  private ngUnsubscribe = new Subject();

  constructor(private store: Store<fromStore.State>, private router: Router) {
    this.isAuth$ = this.store.select(fromStore.getLoggedIn);
    this.userLogin$ = this.store.select(fromStore.getUserLogin);
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd), takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (!this.isAuth$) {
          const id = localStorage.getItem('id');

          if (id) {
            this.store.dispatch(new Auth.UserRequested(id));
          }
        }
      });
  }

  logOff() {
    this.store.dispatch(new Auth.Logout());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
