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

  postRecipe(){
    return this.http.post('http://127.0.0.1:8000/api/recipes/', {
      "name": "Chocolate Cake but from front end",
      "description": "A rich chocolate cake with layers of ganache.",
      "directions": "custom description custom description custom description custom description custom description custom description custom description custom description custom description custom description custom description",
      "image": "http://example.com/images/chocolate-cake.jpg",
      "category_id": 1,
      "subcategory_id": 1,
      "ingredients": [
        {
          "ingredient_id": 1,
          "quantity": 200,
          "measurement_unit": "g"
        },
        {
          "ingredient_id": 2,
          "quantity": 100,
          "measurement_unit": "ml"
        }
      ]
    });
  }

  getIngredients(){
    return this.http.get('http://127.0.0.1:8000/api/ingredients/')
  }

  getIngredient(){
    return this.http.get('http://127.0.0.1:8000/api/ingredients/1')
  }
}
