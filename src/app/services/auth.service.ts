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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly destroying$ = new Subject<void>();
  private msalService = inject(MsalService);
  private msalBroadcastService = inject(MsalBroadcastService);

  // Signals for reactive state
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<AccountInfo | null>(null);
  
  constructor() {
    this.initializeAuth();
  }

  /**
   * Initialize authentication state
   */
  private initializeAuth(): void {
    // Check if user is already logged in
    this.msalService.instance.handleRedirectPromise().then((response) => {
      if (response) {
        this.msalService.instance.setActiveAccount(response.account);
        this.updateAuthState();
      }
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
        this.updateAuthState();
      });

    // Subscribe to interaction status changes
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this.destroying$)
      )
      .subscribe(() => {
        this.updateAuthState();
      });

    // Initial auth state update
    this.updateAuthState();
  }

  /**
   * Update authentication state signals
   */
  private updateAuthState(): void {
    const accounts = this.msalService.instance.getAllAccounts();
    const isLoggedIn = accounts.length > 0;
    
    this.isAuthenticated.set(isLoggedIn);
    
    if (isLoggedIn) {
      const activeAccount = this.msalService.instance.getActiveAccount() || accounts[0];
      this.msalService.instance.setActiveAccount(activeAccount);
      this.currentUser.set(activeAccount);
    } else {
      this.currentUser.set(null);
    }
  }

  /**
   * Login using redirect
   */
  loginRedirect(): void {
    this.msalService.loginRedirect(loginRequest);
  }

  /**
   * Login using popup
   */
  loginPopup(): void {
    this.msalService.loginPopup(loginRequest)
      .subscribe({
        next: (result: AuthenticationResult) => {
          this.msalService.instance.setActiveAccount(result.account);
          this.updateAuthState();
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
  }

  /**
   * Logout using redirect
   */
  logoutRedirect(): void {
    this.msalService.logoutRedirect({
      account: this.msalService.instance.getActiveAccount()
    });
  }

  /**
   * Logout using popup
   */
  logoutPopup(): void {
    this.msalService.logoutPopup({
      account: this.msalService.instance.getActiveAccount()
    }).subscribe({
      next: () => {
        this.updateAuthState();
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
    return user.name || user.username || '';
  }

  /**
   * Get user email
   */
  getUserEmail(): string {
    const user = this.currentUser();
    if (!user) return '';
    return user.username || '';
  }

  /**
   * Cleanup on service destroy
   */
  ngOnDestroy(): void {
    this.destroying$.next();
    this.destroying$.complete();
  }
}
