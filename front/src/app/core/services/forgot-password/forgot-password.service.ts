import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http:HttpClient) { }
  forgotPassword(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/forgot-password', data);
    
  }
  validateCode(data:any){
    return this.http.post('http://127.0.0.1:8000/api/validate-code',data);
  }
  resetPassword(data:any){
    return this.http.post('http://127.0.0.1:8000/api/reset-password',data);
  }

}
