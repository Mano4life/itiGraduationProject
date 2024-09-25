import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('http://127.0.0.1:8000/api/users');
  }

  getUser(id: any){
    return this.http.get(`http://127.0.0.1:8000/api/users/${id}`);
  }
}
