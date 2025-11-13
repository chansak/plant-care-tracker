import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

/**
 * Auth Guard to protect routes
 * Redirects to login if user is not authenticated
 */
export const authGuard: CanActivateFn = (route, state) => {
  const msalService = inject(MsalService);
  const router = inject(Router);
  
  const accounts = msalService.instance.getAllAccounts();
  
  if (accounts.length > 0) {
    // User is authenticated
    return true;
  } else {
    // User is not authenticated, redirect to login
    msalService.loginRedirect();
    return false;
  }
};
