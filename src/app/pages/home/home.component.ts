import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PlantCardComponent } from '../../components/plant-card/plant-card.component';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatSnackBarModule,
    PlantCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Access signals from service
  plants = this.plantService.plants;
  plantsNeedingWater = this.plantService.plantsNeedingWater;
  upcomingWaterings = this.plantService.upcomingWaterings;
  totalPlants = this.plantService.totalPlants;
  plantsNeedingWaterCount = this.plantService.plantsNeedingWaterCount;
  
  // Computed signal for filtered views
  healthyPlants = computed(() => {
    const needsWater = this.plantsNeedingWater();
    const needsWaterIds = new Set(needsWater.map(p => p.id));
    return this.plants().filter(p => !needsWaterIds.has(p.id));
  });
  
  constructor(
    private plantService: PlantService,
    private snackBar: MatSnackBar
  ) {}
  
  onWaterPlant(plantId: string): void {
    const plant = this.plants().find(p => p.id === plantId);
    if (plant) {
      this.plantService.waterPlant(plantId);
      this.showNotification(`${plant.name} has been watered! 💧`);
    }
  }
  
  onDeletePlant(plantId: string): void {
    const plant = this.plants().find(p => p.id === plantId);
    if (plant) {
      this.plantService.deletePlant(plantId);
      this.showNotification(`${plant.name} has been removed from your collection.`);
    }
  }
  
  private showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
