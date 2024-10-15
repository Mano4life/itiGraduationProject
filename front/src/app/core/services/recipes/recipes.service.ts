import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  getRecipes(){
    return this.http.get('http://127.0.0.1:8000/api/recipes');
    
  }

  getSingleRecipe(id:any): Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/api/recipes/${id}`)
  }

  postRecipe(data: any){
    return this.http.post('http://127.0.0.1:8000/api/recipes/', data)
  }

  deleteRecipe(id: any){
    return this.http.delete(`http://127.0.0.1:8000/api/recipes/${id}`)
  }
  updateRecipe(id:any,data:any){
    return this.http.post(`http://127.0.0.1:8000/api/recipes/${id}?_method=PATCH`,data)
  }

  getIngredients(){
    return this.http.get('http://127.0.0.1:8000/api/ingredients/')
  }

  getIngredient(id:any){
    return this.http.get(`http://127.0.0.1:8000/api/ingredients/${id}`)
  }
  rateRecipe(id:any,rating:any){
    const token = localStorage.getItem('auth_token');
    const admin=localStorage.getItem('admin_token');
    const premium=localStorage.getItem('premium_token');
    const authToken = token || admin || premium;
    if(authToken){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.post(`http://127.0.0.1:8000/api/recipes/${id}/rate`,{rating},{ headers });
    }
    else{
      throw new Error('No authorization token found');
    }
  }
  saverecipe(id:any){
    const token = localStorage.getItem('auth_token');
    const admin=localStorage.getItem('admin_token');
    const premium=localStorage.getItem('premium_token');
    const authToken = token || admin || premium;
    if(authToken){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.post(`http://127.0.0.1:8000/api/recipes/${id}/save`,{},{ headers });
    }
    else{
      throw new Error('No authorization token found');
    }
  }
  unsaverecipe(id:any){
    const token = localStorage.getItem('auth_token');
    const admin=localStorage.getItem('admin_token');
    const premium=localStorage.getItem('premium_token');
    const authToken = token || admin || premium;
    if(authToken){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.post(`http://127.0.0.1:8000/api/recipes/${id}/unsave`,{},{ headers });
    }
    else{
      throw new Error('No authorization token found');
    }
  }
  comment(recipe:any,comment:any){
    const token = localStorage.getItem('auth_token');
    const admin=localStorage.getItem('admin_token');
    const premium=localStorage.getItem('premium_token');
    const authToken = token || admin || premium;
    if(authToken){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.post(`http://127.0.0.1:8000/api/recipes/${recipe}/comment`,comment,{headers});
    }
    else{
      throw new Error('No authorization token found');
    }
  }


}
