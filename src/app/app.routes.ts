import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'add-plant',
    loadComponent: () => import('./pages/add-plant/add-plant.component').then(m => m.AddPlantComponent)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
