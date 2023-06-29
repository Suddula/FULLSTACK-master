
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

baseApiUrl:string =environment.BASE_API_URL;
  constructor(private http:HttpClient,private router:Router) {}
    signUp(userObj:any){

      return this.http.post<any>(this.baseApiUrl + "/api/User/register", userObj);

    }
    logIn(loginObj:any){

      return this.http.post<any>(this.baseApiUrl + "/api/User/authenticate",loginObj);
    }
  
    storeToken(tokenValue:string){
      localStorage.setItem('token', tokenValue);
    }

    getToken(){
      return localStorage.getItem('token');
    }
    // isLoggedIn(){
    //   return !!localStorage.getItem('token');
    // }

    signOut(){
      localStorage.clear();
      this.router.navigate(['login']);
    }

}
