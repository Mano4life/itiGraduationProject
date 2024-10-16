import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('http://127.0.0.1:8000/api/users');
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const admin = localStorage.getItem('admin_token');
    const premium = localStorage.getItem('premium_token');
    // Determine which token to use
    const authToken = token || admin || premium;


    if (authToken) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
        return this.http.get<any>('http://127.0.0.1:8000/api/user', { headers });
    } else {
        // Handle the case where neither token exists
        throw new Error('No authorization token found');
    }
  }

  EditUser(Data: any): Observable<any>  {
    const token = localStorage.getItem('auth_token');
    const admin = localStorage.getItem('admin_token');
    const premium = localStorage.getItem('premium_token');
    
    const authToken = token || admin || premium;
      if (authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
      return this.http.patch(`http://127.0.0.1:8000/api/updateUser`,Data,{ headers });
    } else {
    // Handle the case where neither token exists
      throw new Error('No authorization token found');
   }
  }

  deleteUser(id: any){
    return this.http.delete(`http://127.0.0.1:8000/api/users/delete/${id}`)
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
  putSocialMedia(data:any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const admin = localStorage.getItem('admin_token');
    const premium = localStorage.getItem('premium_token');
    
    const authToken = token || admin || premium;
      if (authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
      return this.http.put('http://127.0.0.1:8000/api/userLinks',data,{ headers });
    } else {
      // Handle the case where neither token exists
        throw new Error('No authorization token found');
     }
  }

  publicProfile(id:any){
    return this.http.get(`http://127.0.0.1:8000/api/publicProfile/${id}`);
  }

}
