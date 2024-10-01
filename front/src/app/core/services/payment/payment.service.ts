import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Adjust according to your backend URL

  constructor(private http: HttpClient) {}

  checkout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/payment/checkout`, {}); 
  }

  handleSuccess(): Observable<any> {
    return this.http.get(`${this.apiUrl}/payment/success`);
  }

  handleCancel(): Observable<any> {
    return this.http.get(`${this.apiUrl}/payment/cancel`);
  }
}
