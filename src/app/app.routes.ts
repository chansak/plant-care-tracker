import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard] // Protect home route
  },
  {
    path: 'add-plant',
    loadComponent: () => import('./pages/add-plant/add-plant.component').then(m => m.AddPlantComponent),
    canActivate: [authGuard] // Protect add-plant route
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
