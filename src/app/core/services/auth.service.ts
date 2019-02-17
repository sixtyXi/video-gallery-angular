import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const BASE_URL = 'http://localhost:3004/users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.isLoggedIn = !!localStorage.getItem('fakeToken');
  }

  logIn(login: string, password: string) {
    const fakeToken = UUID.UUID();

    return this.http.post(`${BASE_URL}`, { login, password, fakeToken }).pipe(
      tap((_) => {
        localStorage.setItem('fakeToken', fakeToken);
        this.isLoggedIn = true;
      }),
      catchError(this.handleError)
    );
  }

  logOut() {
    localStorage.removeItem('fakeToken');
    this.isLoggedIn = false;
  }

  isAuth(): boolean {
    return this.isLoggedIn;
  }

  getUserInfo(id: string) {
    return this.http.get(`${BASE_URL}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
