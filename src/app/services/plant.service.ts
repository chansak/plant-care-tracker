import { Injectable, signal, computed, effect } from '@angular/core';
import { Plant, PlantFormData } from '../models/plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private readonly STORAGE_KEY = 'plant-care-tracker-data';
  
  // Signal-based state
  private plantsSignal = signal<Plant[]>(this.loadFromStorage());
  
  // Public readonly signals
  readonly plants = this.plantsSignal.asReadonly();
  
  // Computed signal for plants that need watering today
  readonly plantsNeedingWater = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.plantsSignal().filter(plant => {
      const lastWatered = new Date(plant.lastWatered);
      lastWatered.setHours(0, 0, 0, 0);
      
      const daysSinceWatered = Math.floor(
        (today.getTime() - lastWatered.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      return daysSinceWatered >= plant.wateringFrequency;
    });
  });
  
  // Computed signal for upcoming waterings (next 3 days)
  readonly upcomingWaterings = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);
    
    return this.plantsSignal().filter(plant => {
      const lastWatered = new Date(plant.lastWatered);
      lastWatered.setHours(0, 0, 0, 0);
      
      const nextWateringDate = new Date(lastWatered);
      nextWateringDate.setDate(lastWatered.getDate() + plant.wateringFrequency);
      
      return nextWateringDate > today && nextWateringDate <= threeDaysFromNow;
    });
  });
  
  // Statistics
  readonly totalPlants = computed(() => this.plantsSignal().length);
  readonly plantsNeedingWaterCount = computed(() => this.plantsNeedingWater().length);
  
  constructor() {
    // Auto-save to localStorage when plants change
    effect(() => {
      const plants = this.plantsSignal();
      this.saveToStorage(plants);
    });
  }
  
  addPlant(formData: PlantFormData): void {
    const newPlant: Plant = {
      id: this.generateId(),
      ...formData
    };
    
    this.plantsSignal.update(plants => [...plants, newPlant]);
  }
  
  updatePlant(id: string, updates: Partial<Plant>): void {
    this.plantsSignal.update(plants =>
      plants.map(plant =>
        plant.id === id ? { ...plant, ...updates } : plant
      )
    );
  }
  
  deletePlant(id: string): void {
    this.plantsSignal.update(plants =>
      plants.filter(plant => plant.id !== id)
    );
  }
  
  waterPlant(id: string): void {
    this.updatePlant(id, { lastWatered: new Date() });
  }
  
  getNextWateringDate(plant: Plant): Date {
    const lastWatered = new Date(plant.lastWatered);
    const nextWatering = new Date(lastWatered);
    nextWatering.setDate(lastWatered.getDate() + plant.wateringFrequency);
    return nextWatering;
  }
  
  getDaysSinceWatered(plant: Plant): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastWatered = new Date(plant.lastWatered);
    lastWatered.setHours(0, 0, 0, 0);
    
    return Math.floor(
      (today.getTime() - lastWatered.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
  
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  private loadFromStorage(): Plant[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const plants = JSON.parse(data);
        // Convert date strings back to Date objects
        return plants.map((plant: any) => ({
          ...plant,
          lastWatered: new Date(plant.lastWatered)
        }));
      }
    } catch (error) {
      console.error('Error loading plants from storage:', error);
    }
    
    // Return sample data if nothing in storage
    return this.getSamplePlants();
  }
  
  private saveToStorage(plants: Plant[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(plants));
    } catch (error) {
      console.error('Error saving plants to storage:', error);
    }
  }
  
  private getSamplePlants(): Plant[] {
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(today.getDate() - 5);
    
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    return [
      {
        id: '1',
        name: 'Monstera Deliciosa',
        species: 'Monstera deliciosa',
        lastWatered: sevenDaysAgo,
        wateringFrequency: 7,
        imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
        notes: 'Loves indirect sunlight'
      },
      {
        id: '2',
        name: 'Snake Plant',
        species: 'Sansevieria trifasciata',
        lastWatered: fiveDaysAgo,
        wateringFrequency: 14,
        imageUrl: 'https://images.unsplash.com/photo-1587334207863-9174b90f1e6e?w=400',
        notes: 'Very low maintenance'
      },
      {
        id: '3',
        name: 'Peace Lily',
        species: 'Spathiphyllum',
        lastWatered: twoDaysAgo,
        wateringFrequency: 7,
        imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400',
        notes: 'Keep soil moist'
      }
    ];
  }
}
