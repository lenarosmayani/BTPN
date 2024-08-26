import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from '../../service/orders.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class AddOrderDialogComponent {
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddOrderDialogComponent>,
    private ordersService: OrdersService
  ) {
    this.orderForm = this.fb.group({
      orderCode: ['', Validators.required],
      customerId: ['', Validators.required],
      itemId: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.ordersService.addOrder(this.orderForm.value).subscribe(
        response => {
          console.log('Order added successfully!', response);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error adding order', error);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
