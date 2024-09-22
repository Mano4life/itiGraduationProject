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

  getSingleRecipe(){
    return this.http.get('http://127.0.0.1:8000/api/recipes/1')
  }

  getIngredients(){
    return this.http.get('http://127.0.0.1:8000/api/ingredients/')
  }

  getIngredient(){
    return this.http.get('http://127.0.0.1:8000/api/ingredients/1')
  }
}
