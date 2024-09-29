import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(private http: HttpClient) { }

  getSubCategories(){
    return this.http.get('http://127.0.0.1:8000/api/subcategories');
    // return {'name': 'hello'};
  }

  getSingleSubCategory(id:any): Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/api/subcategories/${id}`)
  }

  postSubCategory(data: any){
    return this.http.post('http://127.0.0.1:8000/api/subcategories/', data)
  }
}
