import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Plant } from '../../models/plant.model';
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-plant-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './plant-card.component.html',
  styleUrl: './plant-card.component.scss'
})
export class PlantCardComponent {
  plant = input.required<Plant>();
  onWater = output<string>();
  onDelete = output<string>();
  onFavoriteToggle = output<string>();

  constructor(private plantService: PlantService) { }

  get needsWater(): boolean {
    const daysSince = this.plantService.getDaysSinceWatered(this.plant());
    return daysSince >= this.plant().wateringFrequency;
  }

  get nextWateringDate(): Date {
    return this.plantService.getNextWateringDate(this.plant());
  }

  get daysSinceWatered(): number {
    return this.plantService.getDaysSinceWatered(this.plant());
  }

  get daysUntilNextWatering(): number {
    const days = this.plant().wateringFrequency - this.daysSinceWatered;
    return Math.max(0, days);
  }

  get wateringStatus(): string {
    if (this.needsWater) {
      return 'Needs water now!';
    }
    const days = this.daysUntilNextWatering;
    if (days === 0) {
      return 'Water today';
    }
    if (days === 1) {
      return 'Water tomorrow';
    }
    return `Water in ${days} days`;
  }

  waterPlant(): void {
    this.onWater.emit(this.plant().id);
  }

  deletePlant(): void {
    if (confirm(`Are you sure you want to delete ${this.plant().name}?`)) {
      this.onDelete.emit(this.plant().id);
    }
  }

  toggleFavorite(): void {
    this.onFavoriteToggle.emit(this.plant().id);
  }
}
