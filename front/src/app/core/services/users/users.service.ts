import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('http://127.0.0.1:8000/api/users');
  }
  getUser(){
    
    const token = localStorage.getItem('auth_token');
    const admin=localStorage.getItem('admin_auth');
    if(token){
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>('http://127.0.0.1:8000/api/user',{ headers });
    }
    else{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
      return this.http.get<any>('http://127.0.0.1:8000/api/user',{ headers });
    }
    
  }
  EditUser(Data: any) {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`http://127.0.0.1:8000/api/updateUser`,Data,{ headers });
  }

  deleteUser(id: any){
    return this.http.delete(`http://127.0.0.1:8000/api/users/${id}`)
  }
  adminEditUser(id:any, data:any){
    return  this.http.patch(`http://127.0.0.1:8000/api/adminEditUser/${id}`,data);
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
  otp(data:any){
    return this.http.post('http://127.0.0.1:8000/api/verify-otp',data);
  }
}
