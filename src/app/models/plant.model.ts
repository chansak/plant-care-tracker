export interface Plant {
  id: string;
  name: string;
  species: string;
  lastWatered: Date;
  wateringFrequency: number; // days between watering
  imageUrl?: string;
  notes?: string;
}

export interface PlantFormData {
  name: string;
  species: string;
  lastWatered: Date;
  wateringFrequency: number;
  imageUrl?: string;
  notes?: string;
}
