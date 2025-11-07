import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { PlantFormData } from '../../models/plant.model';

@Component({
  selector: 'app-add-plant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './add-plant-form.component.html',
  styleUrl: './add-plant-form.component.scss'
})
export class AddPlantFormComponent {
  onPlantAdded = output<PlantFormData>();
  
  plantForm: FormGroup;
  
  wateringFrequencies = [
    { value: 1, label: 'Daily' },
    { value: 2, label: 'Every 2 days' },
    { value: 3, label: 'Every 3 days' },
    { value: 5, label: 'Every 5 days' },
    { value: 7, label: 'Weekly' },
    { value: 10, label: 'Every 10 days' },
    { value: 14, label: 'Every 2 weeks' },
    { value: 21, label: 'Every 3 weeks' },
    { value: 30, label: 'Monthly' }
  ];
  
  popularSpecies = [
    'Monstera deliciosa',
    'Sansevieria trifasciata',
    'Spathiphyllum',
    'Pothos (Epipremnum aureum)',
    'Ficus elastica',
    'Aloe vera',
    'Succulents',
    'Cactus',
    'Philodendron',
    'ZZ Plant (Zamioculcas zamiifolia)',
    'Other'
  ];
  
  constructor(private fb: FormBuilder) {
    this.plantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      species: ['', Validators.required],
      lastWatered: [new Date(), Validators.required],
      wateringFrequency: [7, [Validators.required, Validators.min(1)]],
      imageUrl: [''],
      notes: ['']
    });
  }
  
  onSubmit(): void {
    if (this.plantForm.valid) {
      this.onPlantAdded.emit(this.plantForm.value as PlantFormData);
      this.plantForm.reset({
        name: '',
        species: '',
        lastWatered: new Date(),
        wateringFrequency: 7,
        imageUrl: '',
        notes: ''
      });
    }
  }
  
  get nameControl() {
    return this.plantForm.get('name');
  }
  
  get speciesControl() {
    return this.plantForm.get('species');
  }
  
  get imageUrlControl() {
    return this.plantForm.get('imageUrl');
  }
}
