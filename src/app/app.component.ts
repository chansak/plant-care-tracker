import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { PlantService } from './services/plant.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Plant Care Tracker';

  // Access signals from service for stats
  plantsNeedingWaterCount = this.plantService.plantsNeedingWaterCount;
  totalPlants = this.plantService.totalPlants;

  // Authentication state
  isAuthenticated = this.authService.isAuthenticated;
  currentUser = this.authService.currentUser;

  constructor(
    private plantService: PlantService,
    private authService: AuthService
  ) { }

  getUserName(): string {
    return this.authService.getUserDisplayName();
  }

  getUserEmail(): string {
    return this.authService.getUserEmail();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
  }
}
