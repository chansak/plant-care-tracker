import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AddPlantFormComponent } from '../../components/add-plant-form/add-plant-form.component';
import { PlantService } from '../../services/plant.service';
import { PlantFormData } from '../../models/plant.model';

@Component({
  selector: 'app-add-plant',
  standalone: true,
  imports: [
    MatIconModule,
    MatSnackBarModule,
    AddPlantFormComponent
  ],
  templateUrl: './add-plant.component.html',
  styleUrl: './add-plant.component.scss'
})
export class AddPlantComponent {
  constructor(
    private plantService: PlantService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  
  onPlantAdded(formData: PlantFormData): void {
    this.plantService.addPlant(formData);
    this.showNotification(`${formData.name} has been added to your collection! 🌱`);
    // Navigate back to home after adding
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }
  
  private showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
