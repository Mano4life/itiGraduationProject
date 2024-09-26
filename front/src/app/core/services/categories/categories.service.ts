import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(){
    return this.http.get('http://127.0.0.1:8000/api/categories');
    // return {'name': 'hello'};
  }

  getSingleCategory(id:any): Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/api/categories/${id}`)
  }

  postCategory(data: any){
    return this.http.post('http://127.0.0.1:8000/api/categories/', data)
  }

}
