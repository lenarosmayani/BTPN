import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-customer-details-dialog',
  standalone: true,
  imports: [    
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  
  ],
  templateUrl: './customer-details-dialog.component.html',
  styleUrl: './customer-details-dialog.component.css'
})

export class CustomerDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomerDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
