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

  updatePendingRecipes(data: any){
    return this.http.patch('http://127.0.0.1:8000/api/pendingRecipes',data)
  }

  deletePendingRecipes(id: any){
    return this.http.delete(`http://127.0.0.1:8000/api/pendingRecipes/${id}`)
  }
  
}
