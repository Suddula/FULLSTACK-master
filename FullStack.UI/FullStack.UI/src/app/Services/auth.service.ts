
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

private baseApiUrl:string =environment.USER_API_URL;

private userPayload:any;

  constructor(private http:HttpClient,private router:Router) {
    this.userPayload =this.decodeToken();
  }
    signUp(userObj:any){

      return this.http.post<any>(this.baseApiUrl + "/register", userObj);

    }
    logIn(loginObj:any){

      return this.http.post<any>(this.baseApiUrl + "/authenticate",loginObj);
    }
  
    storeToken(tokenValue:string){
      localStorage.setItem('token', tokenValue);
    }

    storeRefreshToken(tokenValue:string){
      localStorage.setItem('refreshToken', tokenValue);
    }
    getToken(){
      return localStorage.getItem('token');
    }
    getRereshToken(){
      return localStorage.getItem('refreshToken');
    }
    // isLoggedIn(){
    //   return !!localStorage.getItem('token');
    // }

    signOut(){
      localStorage.clear();
      this.router.navigate(['login']);
    }

    decodeToken(){
      const jwtHelper = new JwtHelperService();
      const token = this.getToken()!;
      return jwtHelper.decodeToken(token)
    }

    getfullNameFromToken(){
      if(this.userPayload)
      return this.userPayload.unique_name;
    }
    getroleFromToken(){
      if(this.userPayload)
      return this.userPayload.role;

    }

    renewToken(tokenApi:TokenApiModel){
      return this.http.post<any>(this.baseApiUrl + '/refresh',tokenApi);
    }
}
