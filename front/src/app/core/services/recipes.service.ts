import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  getRecipes(){
    return this.http.get('http://127.0.0.1:8000/api/recipes');
    // return {'name': 'hello'};
  }

  getSingleRecipe(id:any): Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/api/recipes/${id}`)
  }

  postRecipe(data: any){
    return this.http.post('http://127.0.0.1:8000/api/recipes/', data)
  }

  getIngredients(){
    return this.http.get('http://127.0.0.1:8000/api/ingredients/')
  }

  getIngredient(){
    return this.http.get('http://127.0.0.1:8000/api/ingredients/1')
  }
}
