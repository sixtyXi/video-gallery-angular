import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Person } from 'src/app/shared/models/Person.interface';
import { GlobalLoaderService } from 'src/app/globalLoader/global-loader.service';
import { Authenticate } from 'src/app/shared/models/Authenticate.interface';

const BASE_URL = 'http://localhost:3004/users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private globalLoaderService: GlobalLoaderService) {}

  logIn(auth: Authenticate) {
    auth.fakeToken = UUID.UUID();
    this.globalLoaderService.runLoading();

    return this.http
      .post(`${BASE_URL}`, auth)
      .pipe(
        tap(() => this.globalLoaderService.stopLoading()),
        catchError((err) => this.handleError(err))
      );
  }

  logOut() {
    localStorage.removeItem('fakeToken');
    localStorage.removeItem('id');
  }

  getUserInfo(id: string | number) {
    return this.http.get(`${BASE_URL}/${id}`);
  }

  public saveUserInfo(user: Person) {
    localStorage.setItem('fakeToken', user.fakeToken);
    localStorage.setItem('id', `${user.id}`);
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
}
