import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemsService } from '../../service/items.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ]
})

export class UpdateItemDialogComponent implements OnInit {
  itemForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateItemDialogComponent>,
    private formBuilder: FormBuilder,
    private itemsService: ItemsService,
    @Inject(MAT_DIALOG_DATA) public data: { itemId: number; initialData: any }
  ) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      itemCode: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      isAvailable: ['', Validators.required]
    });

    this.setInitialFormValues();
  }

  setInitialFormValues(): void {
    if (this.data && this.data.initialData) {
      this.itemForm.patchValue({
        itemName: this.data.initialData.itemName || '',
        itemCode: this.data.initialData.itemCode || '',
        stock: this.data.initialData.stock || '',
        price: this.data.initialData.price || '',
        isAvailable: this.data.initialData.isAvailable || ''
      });
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      // Buat objek FormData untuk dikirim
      const formData = new FormData();
      formData.append('itemName', this.itemForm.get('itemName')?.value);
      formData.append('itemCode', this.itemForm.get('itemCode')?.value);
      formData.append('stock', this.itemForm.get('stock')?.value);
      formData.append('price', this.itemForm.get('price')?.value);
      formData.append('isAvailable', this.itemForm.get('isAvailable')?.value);
  
      // Panggil metode updateItem untuk mengirim data
      this.itemsService.updateItem(this.data.itemId, formData).subscribe(
        response => {
          console.log(response);
          this.dialogRef.close();
        },
        error => {
          console.error(error);
        }
      );
    }
  }  
  
  onCancel(): void {
    this.dialogRef.close();
  }
}
