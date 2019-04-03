import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const fakeToken = localStorage.getItem('fakeToken');
    let request = req;

    if (fakeToken) {
      request = req.clone({
        headers: req.headers.set('Authorization', `${fakeToken}`)
      });
    }

    return next.handle(request);
  }
}
