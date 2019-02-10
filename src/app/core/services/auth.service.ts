import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = !!(localStorage.getItem('login') && localStorage.getItem('pwd'));
  }

  logIn(login: string, pwd: string) {
    localStorage.setItem('login', login);
    localStorage.setItem('pwd', pwd);
    this.isLoggedIn = true;
  }

  logOut() {
    localStorage.removeItem('login');
    localStorage.removeItem('pwd');
    this.isLoggedIn = false;
  }

  isAuth(): boolean {
    return this.isLoggedIn;
  }

  getUserInfo(): string {
    return localStorage.getItem('login') || '';
  }
}
