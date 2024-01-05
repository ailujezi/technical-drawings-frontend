import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit, OnDestroy {
  private refreshSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.refreshSubscription = interval(60000) // every 60 seconds
      .pipe(
        startWith(0), // start immediately
        switchMap(() => this.authService.refreshToken())
      )
      .subscribe(
        response => {
          localStorage.setItem('accessToken', response.data.access);
          // Handle any additional response data
        },
        error => {
          // Handle error (e.g., redirect to login)
          console.error(error);
        }
      );
      
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
