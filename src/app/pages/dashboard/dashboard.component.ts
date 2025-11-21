import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { AuthService } from '../../services/auth.service';
import { ProgressService } from '../../services/progress.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatTooltipModule,
    MatProgressBarModule,
    RouterModule
  ],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Welcome back, {{ getUserName() }}!</h1>
        <p class="subtitle">Here's an overview of your plant collection.</p>
        
        <!-- Progress Section -->
        <mat-card class="progress-card">
          <mat-card-content>
            <div class="progress-header">
              <div class="progress-info">
                <h3>Plant Care Progress</h3>
                <p class="progress-summary">{{ progressService.getProgressSummary() }}</p>
              </div>
              <div class="progress-status">
                <mat-icon [class.active]="progressService.isRunning()">{{ progressService.isRunning() ? 'sync' : 'sync_disabled' }}</mat-icon>
                <span class="status-text">{{ progressService.isRunning() ? 'Monitoring Active' : 'Monitoring Inactive' }}</span>
              </div>
            </div>
            <mat-progress-bar 
              mode="determinate" 
              [value]="progressService.metrics().completionRate"
              [color]="progressService.metrics().completionRate === 100 ? 'accent' : 'primary'"
            ></mat-progress-bar>
            <div class="progress-details">
              <span>{{ progressService.metrics().completionRate }}% Complete</span>
              @if (progressService.lastCheck()) {
                <span class="last-check">Last updated: {{ progressService.lastCheck()!.toLocaleTimeString() }}</span>
              }
            </div>
          </mat-card-content>
        </mat-card>
      </header>

      <div class="stats-grid">
        <!-- Total Plants Card -->
        <mat-card class="stat-card primary-card">
          <mat-card-content>
            <div class="stat-icon">
              <mat-icon>local_florist</mat-icon>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ totalPlants() }}</span>
              <span class="stat-label">Total Plants</span>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <a mat-button routerLink="/home">VIEW ALL</a>
          </mat-card-actions>
        </mat-card>

        <!-- Needs Water Card -->
        <mat-card class="stat-card warn-card">
          <mat-card-content>
            <div class="stat-icon">
              <mat-icon>water_drop</mat-icon>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ plantsNeedingWaterCount() }}</span>
              <span class="stat-label">Need Water</span>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <a mat-button routerLink="/home">WATER NOW</a>
          </mat-card-actions>
        </mat-card>

        <!-- Healthy Plants Card -->
        <mat-card class="stat-card accent-card">
          <mat-card-content>
            <div class="stat-icon">
              <mat-icon>check_circle</mat-icon>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ totalPlants() - plantsNeedingWaterCount() }}</span>
              <span class="stat-label">Healthy</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-buttons">
          <a mat-raised-button color="primary" routerLink="/add-plant">
            <mat-icon>add</mat-icon>
            Add New Plant
          </a>
        </div>
      </div>

      <div class="favorites-section">
        <h2>Favorite Plants</h2>
        @if (favoritePlants().length === 0) {
          <div class="empty-favorites">
            <mat-icon>star_border</mat-icon>
            <p>No favorite plants yet. Mark plants as favorites from the "My Plants" page!</p>
          </div>
        } @else {
          <div class="favorites-grid">
            @for (plant of favoritePlants(); track plant.id) {
              <mat-card class="favorite-plant-card">
                @if (plant.imageUrl) {
                  <img [src]="plant.imageUrl" [alt]="plant.name" class="favorite-plant-image">
                }
                <mat-card-content>
                  <h3>{{ plant.name }}</h3>
                  <p class="species">{{ plant.species }}</p>
                  <div class="plant-actions">
                    <button mat-icon-button (click)="waterPlant(plant.id)" matTooltip="Water plant">
                      <mat-icon>water_drop</mat-icon>
                    </button>
                    <button mat-icon-button (click)="toggleFavorite(plant.id)" matTooltip="Remove from favorites">
                      <mat-icon class="favorited">star</mat-icon>
                    </button>
                  </div>
                </mat-card-content>
              </mat-card>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 30px;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 8px;
      color: #333;
    }

    .subtitle {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 20px;
    }

    .progress-card {
      margin-top: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .progress-card mat-card-content {
      padding: 24px;
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .progress-info h3 {
      margin: 0 0 8px 0;
      font-size: 1.3rem;
      font-weight: 500;
    }

    .progress-summary {
      margin: 0;
      opacity: 0.9;
      font-size: 0.95rem;
    }

    .progress-status {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.2);
      padding: 8px 16px;
      border-radius: 20px;
    }

    .progress-status mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      animation: pulse 2s ease-in-out infinite;
    }

    .progress-status mat-icon.active {
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    .status-text {
      font-size: 0.9rem;
      font-weight: 500;
    }

    .progress-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
      font-size: 0.9rem;
    }

    .last-check {
      opacity: 0.8;
      font-size: 0.85rem;
    }

    ::ng-deep .progress-card .mat-mdc-progress-bar {
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
    }

    ::ng-deep .progress-card .mdc-linear-progress__bar-inner {
      border-radius: 4px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .stat-card {
      height: 100%;
    }

    .stat-card mat-card-content {
      display: flex;
      align-items: center;
      padding: 24px;
    }

    .stat-icon {
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
    }

    .stat-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: bold;
      line-height: 1;
    }

    .stat-label {
      color: #666;
      margin-top: 4px;
    }

    .primary-card .stat-icon { color: #3f51b5; background-color: #e8eaf6; }
    .warn-card .stat-icon { color: #f44336; background-color: #ffebee; }
    .accent-card .stat-icon { color: #4caf50; background-color: #e8f5e9; }

    .quick-actions {
      margin-top: 20px;
      margin-bottom: 40px;
    }

    .quick-actions h2 {
      margin-bottom: 16px;
    }

    .favorites-section {
      margin-top: 40px;
    }

    .favorites-section h2 {
      margin-bottom: 20px;
    }

    .empty-favorites {
      text-align: center;
      padding: 40px;
      color: #666;
      
      mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: #ccc;
        margin-bottom: 16px;
      }
    }

    .favorites-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }

    .favorite-plant-card {
      cursor: pointer;
      transition: transform 0.2s ease;
      
      &:hover {
        transform: translateY(-4px);
      }
    }

    .favorite-plant-image {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }

    .favorite-plant-card mat-card-content {
      padding: 16px;
    }

    .favorite-plant-card h3 {
      margin: 0 0 4px 0;
      font-size: 1.1rem;
    }

    .favorite-plant-card .species {
      color: #666;
      font-size: 0.9rem;
      margin: 0 0 12px 0;
    }

    .plant-actions {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .favorited {
      color: #ffc107;
    }
  `]
})
export class DashboardComponent {
  private plantService = inject(PlantService);
  private authService = inject(AuthService);
  public progressService = inject(ProgressService);

  totalPlants = this.plantService.totalPlants;
  plantsNeedingWaterCount = this.plantService.plantsNeedingWaterCount;
  favoritePlants = this.plantService.favoritePlants;

  getUserName(): string {
    return this.authService.getUserDisplayName();
  }

  waterPlant(plantId: string): void {
    this.plantService.waterPlant(plantId);
  }

  toggleFavorite(plantId: string): void {
    this.plantService.toggleFavorite(plantId);
  }
}
