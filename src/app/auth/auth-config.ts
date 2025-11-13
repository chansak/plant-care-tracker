import { 
  BrowserCacheLocation, 
  Configuration, 
  LogLevel 
} from '@azure/msal-browser';

/**
 * MSAL Configuration for Azure AD Authentication
 * 
 * Application (client) ID: 9f31697a-b36a-4e2c-85b5-607d9c4283f4
 * Directory (tenant) ID: b210c743-80a7-4519-985b-d870f711a83e
 */

export const msalConfig: Configuration = {
  auth: {
    clientId: '9f31697a-b36a-4e2c-85b5-607d9c4283f4', // Application (client) ID
    authority: 'https://login.microsoftonline.com/b210c743-80a7-4519-985b-d870f711a83e', // Tenant ID
    redirectUri: 'http://localhost:4200', // Redirect URI after login
    postLogoutRedirectUri: 'http://localhost:4200' // Redirect URI after logout
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Store tokens in localStorage
    storeAuthStateInCookie: false // Set to true for IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
      logLevel: LogLevel.Warning
    }
  }
};

/**
 * Scopes for authentication requests
 */
export const loginRequest = {
  scopes: ['User.Read'] // Microsoft Graph API permission to read user profile
};

/**
 * Protected API endpoints configuration
 * Add your API endpoints here if needed
 */
export const protectedResources = {
  graphMe: {
    endpoint: 'https://graph.microsoft.com/v1.0/me',
    scopes: ['User.Read']
  }
};
