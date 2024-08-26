import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CustomersService } from '../../service/customers.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class AddCustomerDialogComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCustomerDialogComponent>,
    private formBuilder: FormBuilder,
    private customersService: CustomersService
  ) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerCode: ['', Validators.required],
      customerAddress: ['', Validators.required],
      customerPhone: ['', Validators.required],
      pic: [null, Validators.required] // Ensure the file is required
    });
    
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.customerForm.patchValue({
        pic: file
      });
      this.customerForm.get('pic')?.updateValueAndValidity();
    }
  }  

  onSubmit(): void {
    if (this.customerForm.valid) {
      const formData = new FormData();
      formData.append('customerName', this.customerForm.get('customerName')?.value);
      formData.append('customerCode', this.customerForm.get('customerCode')?.value);
      formData.append('customerAddress', this.customerForm.get('customerAddress')?.value);
      formData.append('customerPhone', this.customerForm.get('customerPhone')?.value);
      const file = this.customerForm.get('pic')?.value;
      if (file) {
        formData.append('pic', file);
      }
  
      this.customersService.addCustomer(formData).subscribe(
        response => {
          console.log('Customer added successfully', response);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error adding customer', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
