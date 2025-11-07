import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PlantCardComponent } from './components/plant-card/plant-card.component';
import { AddPlantFormComponent } from './components/add-plant-form/add-plant-form.component';
import { PlantService } from './services/plant.service';
import { PlantFormData } from './models/plant.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatTabsModule,
    MatSnackBarModule,
    PlantCardComponent,
    AddPlantFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Plant Care Tracker';
  
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
  
  onPlantAdded(formData: PlantFormData): void {
    this.plantService.addPlant(formData);
    this.showNotification(`${formData.name} has been added to your collection! 🌱`);
  }
  
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
