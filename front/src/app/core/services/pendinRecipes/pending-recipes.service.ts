import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PendingRecipesService {

  constructor(private http:HttpClient) { }

  getPendingRecipes(){
    return this.http.get('http://127.0.0.1:8000/api/pendingRecipes');
  }

  postPendingRecipes(data: any){
    return this.http.post('http://127.0.0.1:8000/api/pendingRecipes',data)
  }

  denyPendingRecipes(id:number, data: any){
    return this.http.patch(`http://127.0.0.1:8000/api/pendingRecipes/${id}/deny`,data)
  }

  deletePendingRecipes(id: number){
    return this.http.delete(`http://127.0.0.1:8000/api/pendingRecipes/${id}`)
  }
  getOnePendingRecipe(id:number){
    return this.http.get(`http://127.0.0.1:8000/api/pendingRecipes/${id}`)
  }
  updatePendingRecipe(id:any,data:any){
    return this.http.post(`http://127.0.0.1:8000/api/pendingRecipes/${id}?_method=PATCH`,data);
  }
  
}
