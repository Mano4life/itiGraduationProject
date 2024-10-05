import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {

   const router=inject(Router);
   const user=localStorage.getItem('auth_token');
   const premium=localStorage.getItem('premium_token');
   const permission=user || premium ;
  if(permission !=null){
    return true;
  }
  else{
    router.navigate(['/']);
    return false;
  }
};
