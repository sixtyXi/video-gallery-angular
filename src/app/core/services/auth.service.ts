import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Person } from 'src/app/shared/models/Person.interface';
import { GlobalLoaderService } from 'src/app/globalLoader/global-loader.service';

const BASE_URL = 'http://localhost:3004/users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean;

  constructor(private http: HttpClient, private globalLoaderService: GlobalLoaderService) {
    this.isLoggedIn = !!localStorage.getItem('fakeToken');
  }

  logIn(login: string, password: string) {
    const fakeToken = UUID.UUID();
    this.globalLoaderService.runLoading();

    return this.http.post(`${BASE_URL}`, { login, password, fakeToken }).pipe(
      tap((response: Person) => {
        this.globalLoaderService.stopLoading();
        this.saveUserInfo(response);
        this.isLoggedIn = true;
      }),
      catchError((err) => this.handleError(err))
    );
  }

  logOut() {
    localStorage.removeItem('fakeToken');
    localStorage.removeItem('id');
    this.isLoggedIn = false;
  }

  isAuth(): boolean {
    return this.isLoggedIn;
  }

  getUserInfo(id: string | number) {
    return this.http.get(`${BASE_URL}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    this.globalLoaderService.stopLoading();

    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  private saveUserInfo(user: Person) {
    localStorage.setItem('fakeToken', user.fakeToken);
    localStorage.setItem('id', `${user.id}`);
  }
}
