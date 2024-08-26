// item.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item.model';
import { ItemRequest } from '../models/item-request.model';

@Injectable({
  providedIn: 'root' // Ensures the service is available application-wide
})
export class ItemsService {
  private apiUrl = 'http://localhost:8080/api/items'; // Base URL for API

  constructor(private http: HttpClient) {}

  // Fetches all items
  getItems(): Observable<Item[]> {
    return this.http.get<{ dataItems: Item[] }>(`${this.apiUrl}/all`).pipe(
      map(response => response.dataItems)
    );
  }

  getItemById(itemId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${itemId}`);
  }

  // Deletes a item by ID
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Adds a new item
  addItem(itemData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, itemData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Updates an existing item
  updateItem(itemId: number, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/update/${itemId}`;
    
    // Konversi FormData menjadi objek JSON
    const jsonObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });
  
    return this.http.put(url, jsonObject, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  
  
}
