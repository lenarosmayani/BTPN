// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root' // Ensures the service is available application-wide
})
export class OrdersService {
  private apiUrl = 'http://localhost:8080/api/order'; // Base URL for API

  constructor(private http: HttpClient) {}

  // Fetches all orders
  getOrders(): Observable<Order[]> {
    return this.http.get<{ dataOrders: Order[] }>(`${this.apiUrl}/all`).pipe(
      map(response => response.dataOrders)
    );
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  // Deletes a order by ID
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Adds a new order
  addOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, orderData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  updateOrder(orderId: number, orderData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${orderId}`, orderData);
  }
  
  
}
