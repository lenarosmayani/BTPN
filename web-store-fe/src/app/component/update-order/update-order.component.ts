import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from '../../service/orders.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ]
})
export class UpdateOrderDialogComponent implements OnInit {
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ordersService: OrdersService,
    public dialogRef: MatDialogRef<UpdateOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number } // Use the correct type for data
  ) {
    this.orderForm = this.fb.group({
      orderCode: ['', Validators.required],
      customerId: [null, Validators.required],
      itemId: [null, Validators.required],
      quantity: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.orderId) {
      this.ordersService.getOrderById(this.data.orderId).subscribe(order => {
        this.orderForm.patchValue({
          orderCode: order.ordersCode || '',
          customerId: order.customerId || null,
          itemId: order.itemsId || null,
          quantity: order.quantity || 1
        });
      });
    }
  }

  save(): void {
    if (this.orderForm.valid) {
      const updatedOrder = this.orderForm.value;
      this.ordersService.updateOrder(this.data.orderId, updatedOrder).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

