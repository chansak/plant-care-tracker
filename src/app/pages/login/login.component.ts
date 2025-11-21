import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Welcome Back</mat-card-title>
          <mat-card-subtitle>Sign in to continue</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <!-- Microsoft Login -->
          <button mat-stroked-button class="ms-login-btn" (click)="loginWithMicrosoft()">
            <img src="assets/ms-logo.svg" alt="Microsoft Logo" class="ms-logo" onerror="this.style.display='none'">
            <mat-icon *ngIf="true">grid_view</mat-icon> <!-- Fallback icon -->
            <span>Sign in with Microsoft</span>
          </button>

          <div class="divider">
            <mat-divider></mat-divider>
            <span>OR</span>
            <mat-divider></mat-divider>
          </div>

          <!-- Internal Login -->
          <form (ngSubmit)="loginInternal()" class="login-form">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput [(ngModel)]="email" name="email" type="email" required>
              <mat-icon matSuffix>email</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput [(ngModel)]="password" name="password" [type]="hidePassword ? 'password' : 'text'" required>
              <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
            </mat-form-field>

            <div class="error-message" *ngIf="errorMessage()">
              {{ errorMessage() }}
            </div>

            <button mat-raised-button color="primary" type="submit" [disabled]="!email || !password">
              Sign In
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      min-height: 80vh;
      background-color: #f5f5f5;
    }
    
    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 20px;
    }
    
    mat-card-header {
      margin-bottom: 20px;
      justify-content: center;
      text-align: center;
    }
    
    .ms-login-btn {
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .ms-logo {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    
    .divider {
      display: flex;
      align-items: center;
      margin: 20px 0;
      color: #666;
      font-size: 12px;
    }
    
    .divider mat-divider {
      flex: 1;
    }
    
    .divider span {
      padding: 0 10px;
    }
    
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .error-message {
      color: #f44336;
      font-size: 12px;
      text-align: center;
      margin-bottom: 10px;
    }
    
    button[type="submit"] {
      margin-top: 10px;
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  hidePassword = true;
  errorMessage = signal<string>('');

  loginWithMicrosoft() {
    this.authService.loginRedirect();
  }

  loginInternal() {
    if (this.authService.loginInternal(this.email, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage.set('Invalid email or password');
    }
  }
}
