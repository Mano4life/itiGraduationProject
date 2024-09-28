import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  getUser(){
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>('http://127.0.0.1:8000/api/user',{ headers });
  }
  EditUser(Data: any) {
     const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`http://127.0.0.1:8000/api/updateUser`,Data,{ headers });
  }
  login(Data: any){
    return this.http.post<{
      token: string;
      
    }>('http://127.0.0.1:8000/api/login',Data);
  }
  register(Data:any){
    return this.http.post('http://127.0.0.1:8000/api/register',Data);
  }
  logout() {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://127.0.0.1:8000/api/logout', {}, { headers });
    
  }
}
