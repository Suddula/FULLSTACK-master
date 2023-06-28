import { Injectable, inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { Observable } from "rxjs/internal/Observable";
import { AuthService } from "../Services/auth.service";

@Injectable({
  providedIn:'root'
})
export class authGuard {

  constructor(private router:Router,
    private toast:NgToastService,
    private auth:AuthService){}
  
  canActivate():boolean{
      if(!this.auth.isLoggedIn()){
        return true;
      }else{
        this.toast.error({detail:"ERROR",summary:"Please Login First!"});
        this.router.navigate(['login']);
        return false;
      }
  }


}




