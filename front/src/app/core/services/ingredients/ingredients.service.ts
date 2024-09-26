import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private http: HttpClient) { }

  getIngredients(){
    return this.http.get('http://127.0.0.1:8000/api/ingredients');
    // return {'name': 'hello'};
  }

  getSingleIngredient(id:any): Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/api/ingredients/${id}`)
  }

  postIngredient(data: any){
    return this.http.post('http://127.0.0.1:8000/api/ingredients/', data)
  }
}
