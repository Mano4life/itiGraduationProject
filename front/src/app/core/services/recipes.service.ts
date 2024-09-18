import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  getRecipes(){
    return this.http.get('http://127.0.0.1:8000/recipes');
    // return {'name': 'hello'};
  }

  getSingleRecipe(){
    return this.http.get('http://127.0.0.1:8000/recipes/1')
  }
}
