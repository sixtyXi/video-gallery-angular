import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromStore from '../../store/reducers';
import * as Auth from '../../core/actions/auth';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  isAuth$: Observable<boolean>;

  constructor(private store: Store<fromStore.State>) {
    this.isAuth$ = this.store.select(fromStore.getLoggedIn);
  }

  canActivate(): Observable<boolean> {
    return this.isAuth$.pipe(
      map((authed) => {
        if (authed) {
          return true;
        } else {
          this.store.dispatch(new Auth.LoginRedirect());
          return false;
        }
      })
    );
  }
}
