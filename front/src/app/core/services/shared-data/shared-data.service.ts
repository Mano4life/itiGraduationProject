import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  email:string='';
  code:string='';
  constructor() { }
  setemail(data:string){
    console.log("Setting email:", data);
    this.email=data;
  }
  getemail(){
    return this.email;
    }
    setcode(data:string){
      this.code=data;
    }
    getcode(){
      return this.code;
      }
  
}
