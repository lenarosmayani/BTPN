import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer.model';
import { CustomersService } from '../../service/customers.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MinioService } from '../../service/minio.service';
import { CustomerDetailsDialogComponent } from '../customer-details-dialog/customer-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AddCustomerDialogComponent } from '../add-customer/add-customer.component';
import { UpdateCustomerDialogComponent } from '../update-customer/update-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule, 
    MatPaginatorModule
  ],
  providers: [CustomersService, MinioService]
})
export class CustomerComponent implements AfterViewInit, OnInit {
  customers: Customer[] = [];
  displayedColumns: string[] = ['number', 'customerID', 'customerName', 'customerAddress', 'customerPhone', 'action'];
  dataSource = new MatTableDataSource<Customer>(this.customers);
  searchQuery: string = '';
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public customersService: CustomersService,
    public minioService: MinioService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadCustomers(): void {
    this.customersService.getCustomers().subscribe(data => {
      if (Array.isArray(data)) {
        this.customers = data.map(customer => ({
          ...customer,
          pic: customer.pic ? this.minioService.getFileUrl(customer.pic) : ''
        }));
        // Set data to the dataSource
        this.dataSource.data = this.customers;
      } else {
        console.error('Unexpected data format:', data);
      }
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }

  viewCustomerDetails(customer: Customer): void {
    this.dialog.open(CustomerDetailsDialogComponent, {
      width: '400px',
      data: customer,
    });
  }

  deleteCustomer(id: number): void {
    this.customersService.deleteCustomer(id).subscribe(() => {
      this.loadCustomers();
    });
  }

  openAddCustomerDialog(): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      this.loadCustomers();
    });
  }  

  openUpdateDialog(customerId: number): void {
    this.customersService.getCustomerById(customerId).subscribe(customerData => {
      const dialogRef = this.dialog.open(UpdateCustomerDialogComponent, {
        data: { 
          customerId, 
          initialData: customerData 
        },
        width: '700px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed', result);
        this.loadCustomers();
      });
    });
  }  
}
