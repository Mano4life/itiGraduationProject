import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const otpGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const permission=localStorage.getItem('email');
  if(permission !=null){
    return true;
  }
  else{
    router.navigate(['*']);
    return false;
  }
};
