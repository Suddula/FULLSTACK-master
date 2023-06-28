
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseApiUrl:string =environment.BASE_API_URL;
  constructor(private http:HttpClient) {}
    signUp(userObj:any){

      return this.http.post<any>(this.baseApiUrl + "/api/User/register", userObj);

    }
    logIn(loginObj:any){

      return this.http.post<any>(this.baseApiUrl + "/api/User/authenticate",loginObj);
    }
  
    storeToken(tokenValue:string){
      localStorage.setItem('token', tokenValue)
    }

    getToken(){
      return localStorage.getItem('token')
    }
    isLoggedIn():boolean{
      return !!localStorage.getItem('token')
    }

}
