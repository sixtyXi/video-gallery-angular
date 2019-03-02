import { AuthService } from '../../services/auth.service';
import {
  Login,
  LoginSuccess,
  Logout,
  AuthActionTypes,
  LoginFailure,
  UserRequested,
  LogoutSuccess
} from '../../actions/auth';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Authenticate } from 'src/app/shared/models/Authenticate.interface';
import { Person } from 'src/app/shared/models/Person.interface';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private router: Router,
    private actions$: Actions
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload.auth),
    exhaustMap((auth: Authenticate) =>
      this.authService
        .logIn(auth)
        .pipe(
          tap((user: Person) => this.authService.saveUserInfo(user)),
          tap(() => this.router.navigate([ '/' ])),
          map((user: Person) => new LoginSuccess({ user })),
          catchError((error) => of(new LoginFailure(error)))
        )
    )
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap(() => this.authService.logOut()),
    tap(() => this.router.navigate([ 'login' ])),
    map(() => new LogoutSuccess())
  );

  @Effect()
  requestUser$ = this.actions$.pipe(
    ofType(AuthActionTypes.UserRequested),
    map((action: UserRequested) => action.payload.toString()),
    exhaustMap((id) =>
      this.authService
        .getUserInfo(id)
        .pipe(
          map((user: Person) => new LoginSuccess({ user })),
          catchError((error) => of(new LoginFailure(error)))
        )
    )
  );

  @Effect({
    dispatch: false
  })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect),
    tap(() => this.router.navigate([ 'login' ]))
  );
}
