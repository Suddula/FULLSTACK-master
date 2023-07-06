import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResetPassword } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
private baseApiUrl:string = environment.USER_API_URL;
  constructor(private http:HttpClient) { }

sendResetPasswordLink(email:string){
  return this.http.post<any>(`${this.baseApiUrl}/send-reset-email/${email}`, {});
}
resetPassword(resetPasswordObj:ResetPassword){
  return this.http.post<any>(`${this.baseApiUrl}/reset-password`,resetPasswordObj);
}

}
