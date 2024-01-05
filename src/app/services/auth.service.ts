import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccessRefreshToken } from '../interfaces/access_refresh_token';
import { AccessToken } from '../interfaces/access_token'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<AccessRefreshToken> {
    const url = 'http://localhost:8080/auth/jwt/create'
    return this.http.post<AccessRefreshToken>(url, data);
  }

  register(data: any) {
    const url = 'http://localhost:8080/auth/users';
    return this.http.post(url, data);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('accessToken') != null;
  }

  refreshToken(): Observable<AccessToken>  {
    const url = 'http://localhost:8080/auth/jwt/refresh'
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      return this.http.post<AccessToken>(url, { refresh: refreshToken });
    }
    return throwError('No refresh token available');
  }
}
