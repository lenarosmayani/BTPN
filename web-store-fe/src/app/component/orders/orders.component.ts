import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../service/orders.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Order } from '../../models/order.model';
import { OrderDetailDialogComponent } from '../order-detail/order-detail.component';
import { AddOrderDialogComponent } from '../add-order-dialog/add-order-dialog.component';
import { UpdateOrderDialogComponent } from '../update-order/update-order.component';
@Component({
  selector: 'app-order',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [OrdersService]
})
export class OrdersComponent implements AfterViewInit, OnInit {
download() {
throw new Error('Method not implemented.');
}
  orders: Order[] = [];
  displayedColumns: string[] = ['number', 'orderId', 'ordersDate', 'customerId', 'itemsId', 'quantity', 'totalPrice', 'action'];
  dataSource = new MatTableDataSource<Order>(this.orders);
  searchQuery: string = '';
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private ordersService: OrdersService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  loadOrders(): void {
    this.ordersService.getOrders().subscribe(
      data => {
        console.log(data); // Log data untuk debugging
        if (Array.isArray(data)) {
          this.orders = data;
          this.dataSource.data = this.orders;
        } else {
          console.error('Unexpected data format:', data);
        }
      },
      error => console.error('Error loading orders:', error)
    );
  }

  viewOrderDetails(order: Order): void {
    this.dialog.open(OrderDetailDialogComponent, {
      width: '400px',
      data: order,
    });
  }

  deleteOrder(id: number): void {
    this.ordersService.deleteOrder(id).subscribe(() => {
      this.loadOrders();
    });
  }

  openAddOrderDialog(): void {
    const dialogRef = this.dialog.open(AddOrderDialogComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog closed');
      this.loadOrders();
    });
  }  

  openUpdateDialog(orderId: string): void {
    const dialogRef = this.dialog.open(UpdateOrderDialogComponent, {
      width: '700px',
      data: { orderId } 
    }); 
  }

  refreshOrders() {
    this.ordersService.getOrders().subscribe((orders: any[]) => {
      this.dataSource.data = orders;
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }
}
