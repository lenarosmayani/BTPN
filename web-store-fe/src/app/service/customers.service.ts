// customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root' // Ensures the service is available application-wide
})
export class CustomersService {
  private apiUrl = 'http://localhost:8080/api/customers'; // Base URL for API

  constructor(private http: HttpClient) {}

  // Fetches all customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<{ customerList: Customer[] }>(`${this.apiUrl}/All`).pipe(
      map(response => response.customerList)
    );
  }

  getCustomerById(customerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${customerId}`);
  }

  // Deletes a customer by ID
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Adds a new customer
  addCustomer(customerData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, customerData);
  }

  // Updates an existing customer
  updateCustomer(customerId: number, customerData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${customerId}`, customerData);
  }
}
