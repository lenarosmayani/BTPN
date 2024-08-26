import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomersService } from '../../service/customers.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class UpdateCustomerDialogComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateCustomerDialogComponent>,
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    @Inject(MAT_DIALOG_DATA) public data: { customerId: number; data: any },
    private cd: ChangeDetectorRef // Inject ChangeDetectorRef here
) {}


  ngOnInit(): void {
    console.log('Initial Data:', this.data);

    this.customerForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerCode: ['', Validators.required],
      customerAddress: ['', Validators.required],
      customerPhone: ['', Validators.required],
      pic: [null] // Optional
    });

    this.setInitialFormValues();
    console.log('customer :', this.customerForm);
  }

  

  setInitialFormValues(): void {
    if (this.data && this.data.data) {
        this.customerForm.patchValue({
            customerName: this.data.data.customerName || '',
            customerCode: this.data.data.customerCode || '',
            customerAddress: this.data.data.customerAddress || '',
            customerPhone: this.data.data.customerPhone || ''
        });

        console.log('Form Value after patch:', this.customerForm.value);

      
          this.cd.detectChanges();
          }
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

      this.customersService.updateCustomer(this.data.customerId, formData).subscribe(
        response => {
          console.log('Customer updated successfully', response);
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error updating customer', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
