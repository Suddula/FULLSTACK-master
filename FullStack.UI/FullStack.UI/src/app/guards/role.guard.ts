import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

export const roleGuard: CanActivateFn = (route, state) => {
  const router =inject(Router);
  const toast = inject(NgToastService);
  const role = route.data['role'];
  if(role==="ADMIN"){
    return true;
  }else{
    toast.error({detail:"ERROR",summary:"Role not Matched"});
    router.navigate(['login']);
    return false;
  }
  
};
