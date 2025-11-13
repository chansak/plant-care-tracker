import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MsalService } from '@azure/msal-angular';
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
export class AppComponent implements OnInit {
  title = 'Plant Care Tracker';
  
  private msalService = inject(MsalService);
  
  // Access signals from service for stats
  totalPlants = this.plantService.totalPlants;
  plantsNeedingWaterCount = this.plantService.plantsNeedingWaterCount;
  
  // Authentication state
  isAuthenticated = this.authService.isAuthenticated;
  currentUser = this.authService.currentUser;
  
  constructor(
    private plantService: PlantService,
    private authService: AuthService
  ) {}
  
  async ngOnInit(): Promise<void> {
    // Initialize MSAL
    await this.msalService.instance.initialize();
  }
  
  login(): void {
    this.authService.loginRedirect();
  }
  
  logout(): void {
    this.authService.logoutRedirect();
  }
  
  getUserName(): string {
    return this.authService.getUserDisplayName();
  }
}
