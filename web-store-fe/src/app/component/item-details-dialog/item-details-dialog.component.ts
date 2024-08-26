import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-item-details-dialog',
  standalone: true,
  imports: [    
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './item-details-dialog.component.html',
  styleUrl: './item-details-dialog.component.css'
})

export class ItemDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ItemDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
