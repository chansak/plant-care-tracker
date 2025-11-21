import { Component, inject, signal, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-user-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
    ],
    template: `
    <h2 mat-dialog-title>{{data.id ? 'Edit' : 'Add'}} User</h2>
    <mat-dialog-content>
      <form class="user-form">
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input matInput [(ngModel)]="data.name" name="name" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="data.email" name="email" type="email" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Role</mat-label>
          <mat-select [(ngModel)]="data.role" name="role" required>
            <mat-option value="user">User</mat-option>
            <mat-option value="admin">Admin</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" *ngIf="!data.id">
          <mat-label>Password</mat-label>
          <input matInput [(ngModel)]="data.password" name="password" required>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="data" [disabled]="!data.name || !data.email">Save</button>
    </mat-dialog-actions>
  `,
    styles: [`
    .user-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-top: 10px;
    }
  `]
})
export class UserDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule
    ],
    template: `
    <div class="container">
      <div class="header">
        <h1>User Management</h1>
        <button mat-raised-button color="primary" (click)="openUserDialog()">
          <mat-icon>add</mat-icon>
          Add User
        </button>
      </div>

      <table mat-table [dataSource]="users()" class="mat-elevation-z8">
        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let user"> {{user.name}} </td>
        </ng-container>

        <!-- Email Column -->
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> Email </th>
          <td mat-cell *matCellDef="let user"> {{user.email}} </td>
        </ng-container>

        <!-- Role Column -->
        <ng-container matColumnDef="role">
          <th mat-header-cell *matHeaderCellDef> Role </th>
          <td mat-cell *matCellDef="let user"> 
            <span class="role-badge" [class.admin]="user.role === 'admin'">
              {{user.role | titlecase}}
            </span>
          </td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Actions </th>
          <td mat-cell *matCellDef="let user">
            <button mat-icon-button color="primary" (click)="openUserDialog(user)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteUser(user)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
    styles: [`
    .container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    table {
      width: 100%;
    }
    
    .role-badge {
      padding: 4px 8px;
      border-radius: 4px;
      background-color: #e0e0e0;
      font-size: 12px;
    }
    
    .role-badge.admin {
      background-color: #e3f2fd;
      color: #1976d2;
    }
  `]
})
export class UserManagementComponent {
    private userService = inject(UserService);
    private dialog = inject(MatDialog);

    users = this.userService.users;
    displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

    openUserDialog(user?: User) {
        const dialogRef = this.dialog.open(UserDialogComponent, {
            width: '400px',
            data: user ? { ...user } : { role: 'user' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (user) {
                    this.userService.updateUser(result);
                } else {
                    this.userService.addUser(result);
                }
            }
        });
    }

    deleteUser(user: User) {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            this.userService.deleteUser(user.id);
        }
    }
}
