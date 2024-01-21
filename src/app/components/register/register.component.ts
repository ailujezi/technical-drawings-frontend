import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';


import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerData = {
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: ''
  };

  constructor(private router: Router, private authService: AuthService) {}


  onRegister(): void {
    this.authService.register(this.registerData).pipe(
      tap(response => {
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return of(null);
      })
    ).subscribe();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
