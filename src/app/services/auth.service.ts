import { Injectable, signal, inject } from '@angular/core';
import {
  MsalService,
  MsalBroadcastService
} from '@azure/msal-angular';
import {
  InteractionStatus,
  AuthenticationResult,
  EventMessage,
  EventType,
  AccountInfo
} from '@azure/msal-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { loginRequest } from '../auth/auth-config';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly destroying$ = new Subject<void>();
  private msalService = inject(MsalService);
  private msalBroadcastService = inject(MsalBroadcastService);
  private userService = inject(UserService);
  private router = inject(Router);

  // Signals for reactive state
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<AccountInfo | User | null>(null);
  authType = signal<'msal' | 'internal' | null>(null);

  constructor() {
    // MSAL is already initialized via APP_INITIALIZER in main.ts
    this.initializeAuth();
  }

  /**
   * Initialize authentication state
   */
  private initializeAuth(): void {
    // Check for internal session first
    const internalUser = localStorage.getItem('internalUser');
    if (internalUser) {
      this.currentUser.set(JSON.parse(internalUser));
      this.isAuthenticated.set(true);
      this.authType.set('internal');
      return;
    }

    // Check if user is already logged in with MSAL
    this.msalService.instance.handleRedirectPromise().then((response) => {
      if (response) {
        this.msalService.instance.setActiveAccount(response.account);
        this.updateMsalAuthState();
        // Navigate to dashboard after successful redirect login
        this.router.navigate(['/dashboard']);
      }
    }).catch((error) => {
      console.error('Error handling redirect:', error);
    });

    // Subscribe to MSAL events
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) =>
          msg.eventType === EventType.LOGIN_SUCCESS ||
          msg.eventType === EventType.LOGOUT_SUCCESS ||
          msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        ),
        takeUntil(this.destroying$)
      )
      .subscribe((result: EventMessage) => {
        this.updateMsalAuthState();
      });

    // Subscribe to interaction status changes
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this.destroying$)
      )
      .subscribe(() => {
        this.updateMsalAuthState();
      });

    // Initial auth state update for MSAL if not internal
    if (!this.isAuthenticated()) {
      this.updateMsalAuthState();
    }
  }

  /**
   * Update MSAL authentication state signals
   */
  private updateMsalAuthState(): void {
    if (this.authType() === 'internal') return;

    const accounts = this.msalService.instance.getAllAccounts();
    const isLoggedIn = accounts.length > 0;

    this.isAuthenticated.set(isLoggedIn);

    if (isLoggedIn) {
      const activeAccount = this.msalService.instance.getActiveAccount() || accounts[0];
      this.msalService.instance.setActiveAccount(activeAccount);
      this.currentUser.set(activeAccount);
      this.authType.set('msal');
    } else {
      if (this.authType() === 'msal') {
        this.currentUser.set(null);
        this.authType.set(null);
      }
    }
  }

  /**
   * Login using redirect (MSAL)
   */
  loginRedirect(): void {
    this.msalService.loginRedirect(loginRequest);
  }

  /**
   * Login using popup (MSAL)
   */
  loginPopup(): void {
    this.msalService.loginPopup(loginRequest)
      .subscribe({
        next: (result: AuthenticationResult) => {
          this.msalService.instance.setActiveAccount(result.account);
          this.updateMsalAuthState();
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
  }

  /**
   * Internal Login
   */
  loginInternal(email: string, password: string): boolean {
    const user = this.userService.getUserByEmail(email);
    if (user && user.password === password) {
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      this.authType.set('internal');
      localStorage.setItem('internalUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  /**
   * Logout
   */
  logout(): void {
    if (this.authType() === 'internal') {
      this.currentUser.set(null);
      this.isAuthenticated.set(false);
      this.authType.set(null);
      localStorage.removeItem('internalUser');
      this.router.navigate(['/login']);
    } else {
      this.logoutRedirect();
    }
  }

  /**
   * Logout using redirect (MSAL)
   */
  logoutRedirect(): void {
    this.msalService.logoutRedirect({
      account: this.msalService.instance.getActiveAccount()
    });
  }

  /**
   * Logout using popup (MSAL)
   */
  logoutPopup(): void {
    this.msalService.logoutPopup({
      account: this.msalService.instance.getActiveAccount()
    }).subscribe({
      next: () => {
        this.updateMsalAuthState();
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }

  /**
   * Get user display name
   */
  getUserDisplayName(): string {
    const user = this.currentUser();
    if (!user) return '';

    if ('username' in user) { // MSAL AccountInfo
      return user.name || user.username || '';
    } else { // Internal User
      return user.name || user.email || '';
    }
  }

  /**
   * Get user email
   */
  getUserEmail(): string {
    const user = this.currentUser();
    if (!user) return '';

    if ('username' in user) { // MSAL AccountInfo
      return user.username || '';
    } else { // Internal User
      return user.email || '';
    }
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    const user = this.currentUser();
    if (!user) return false;

    if ('role' in user) {
      return user.role === 'admin';
    }
    // Assume MSAL users are not admins for now, or check claims
    return false;
  }

  /**
   * Cleanup on service destroy
   */
  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
