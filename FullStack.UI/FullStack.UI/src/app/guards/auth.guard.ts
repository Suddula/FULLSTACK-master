
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";


export const authGuard : CanActivateFn = (_route, _state) => {
  const token = localStorage.getItem('token');
  const router =inject(Router);
  const toast = inject(NgToastService);

  if(token){
    return true;
  }else{
    toast.error({detail:"ERROR",summary:"Token not there"});
    router.navigate(['login']);
    return false;
  }
   
}
