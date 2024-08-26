// minio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinioService {
  private baseUrl = 'http://localhost:9000'; // URL MinIO Anda
  private bucketName = 'web-store-79'; // Nama bucket di MinIO

  constructor(private http: HttpClient) {}

  // Mendapatkan file dari MinIO
  getFileUrl(fileName: string): string {
    return `${this.baseUrl}/${this.bucketName}/${fileName}`;
  }
}
