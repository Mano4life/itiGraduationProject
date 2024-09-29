import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PendingRecipesService {

  constructor(private http:HttpClient) { }

  pendingRecipes(){
    return this.http.get('http://127.0.0.1:8000/api/pendingRecipes');
  }

  
  postRecipe(data: any){
    return this.http.post('http://127.0.0.1:8000/api/pendingRecipes/', data)
  }

  deleteRecipe(id: any){
    return this.http.delete(`http://127.0.0.1:8000/api/pendingRecipes/${id}`)
  }
}
