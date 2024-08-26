import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemsService } from '../../service/items.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class AddItemComponent implements OnInit {
  itemForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    private formBuilder: FormBuilder,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      itemCode: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      isAvailable: [false, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const itemData = {
        itemName: this.itemForm.get('itemName')?.value,
        itemCode: this.itemForm.get('itemCode')?.value,
        stock: this.itemForm.get('stock')?.value,
        price: this.itemForm.get('price')?.value,
        isAvailable: this.itemForm.get('isAvailable')?.value
      };
  
      this.itemsService.addItem(itemData).subscribe(
        response => {
          console.log('Item successfully added:', response);
          this.dialogRef.close();
        },
        error => {
          console.error('Error adding item:', error);
        }
      );
    }
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
