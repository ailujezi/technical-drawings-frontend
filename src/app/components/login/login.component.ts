import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

import {MatGridListModule} from '@angular/material/grid-list'; 
import { MatButtonModule } from '@angular/material/button';


import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatGridListModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = { username: '', password: '' };

  constructor(private router: Router, private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.loginData).pipe(
      tap(response => {
        sessionStorage.setItem('accessToken', response.access);
        sessionStorage.setItem('refreshToken', response.refresh);

        this.router.navigate(['/main']);
      }),
      catchError(error => {
        console.error("No User with that data", error);
        return of(null); // Return an observable to complete the pipe
      })
    ).subscribe();
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
