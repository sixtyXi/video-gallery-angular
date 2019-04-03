import { Action } from '@ngrx/store';
import { Person } from 'src/app/shared/models/Person.interface';
import { Authenticate } from 'src/app/shared/models/Authenticate.interface';

export enum AuthActionTypes {
  Login = '[Login Dialog] Login',
  Logout = '[Page Header] Logout',
  LoginSuccess = '[Auth Service] LoginSuccess',
  LogoutSuccess = '[Auth] LogoutSuccess',
  LoginFailure = '[Auth Service] LoginFailure',
  UserRequested = '[Page Header] UserRequested',
  LoginRedirect = '[Auth Guard] LoginRedirect'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: { auth: Authenticate }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: Person }) {}
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LogoutSuccess;
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class UserRequested implements Action {
  readonly type = AuthActionTypes.UserRequested;

  constructor(public payload: number | string) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export type AuthActions =
  | Login
  | Logout
  | LoginSuccess
  | LogoutSuccess
  | LoginFailure
  | UserRequested
  | LoginRedirect;
