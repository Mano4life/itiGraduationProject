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
    // return {'name': 'hello'};
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
    return this.http.put(`http://127.0.0.1:8000/api/recipes/${id}`,data)
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
    if(token){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`http://127.0.0.1:8000/api/recipes/${id}/rate`,{rating},{ headers });
    }
    else{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
    return this.http.post(`http://127.0.0.1:8000/api/recipes/${id}/rate`,{rating},{ headers });
    }
  }
  saverecipe(id:any){
    const token = localStorage.getItem('auth_token');
    const admin=localStorage.getItem('admin_token');
    if(token){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`http://127.0.0.1:8000/api/recipes/${id}/save`,{},{ headers });
    }
    else{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
    return this.http.post(`http://127.0.0.1:8000/api/recipes/${id}/save`,{},{ headers });
    }
  }
  unsaverecipe(id:any){
    const token = localStorage.getItem('auth_token');
    const admin=localStorage.getItem('admin_token');
    if(token){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`http://127.0.0.1:8000/api/recipes/${id}/unsave`,{},{ headers });
    }
    else{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
      return this.http.post(`http://127.0.0.1:8000/api/recipes/${id}/unsave`,{},{ headers });
    }
  }
  comment(recipe:any,comment:any){
    const token = localStorage.getItem('auth_token');
    const admin=localStorage.getItem('admin_token');
    if(token){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`http://127.0.0.1:8000/api/recipes/${recipe}/comment`,comment,{headers});
    }
    else{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${admin}`);
    return this.http.post(`http://127.0.0.1:8000/api/recipes/${recipe}/comment`,comment,{headers});
    }
  }


}
