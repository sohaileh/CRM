
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem('token')|| ''
    if (accessToken) {
      const req = request.clone({
        headers: request.headers.set('Authorization', 'bearer ' +accessToken),
      });
      return next.handle(req);
    } else {
      return next.handle(request);
    }
  }
}

