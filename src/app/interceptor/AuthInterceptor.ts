import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const accessToken = sessionStorage.getItem('accessToken');
    const authService = inject(AuthService);

    let apiReq = request.clone({ url: `${environment.apiUrl}/${request.url}` });

    if (accessToken && authService.isLoggedIn()) {
      apiReq = apiReq.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(apiReq);
  }
}