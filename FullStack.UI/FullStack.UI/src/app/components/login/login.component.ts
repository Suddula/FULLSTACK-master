import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import ValidateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  type:string="password";
  isText:boolean=false;
  eyeIcon:string= "fa-eye-slash";
  loginForm!:FormGroup;
  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;


  constructor(private fb:FormBuilder,
    private authServerice:AuthService,
    private router:Router,
    private toast:NgToastService,
    private userStore:UserStoreService,
    private resetPassword:ResetPasswordService
    ){}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['',Validators.required]

    })
  }
  hideShowPass(){
    this.isText =!this.isText;
    this.isText ? this.eyeIcon ="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText ? this.type ='text':this.type ="password";
  }
  onLogin(){
    if(this.loginForm.valid){

      console.log(this.loginForm.value);
      //send to object to database
      this.authServerice.logIn(this.loginForm.value)
      .subscribe({
        next:(response)=>{
          this.loginForm.reset();
          this.authServerice.storeToken(response.accessToken);
          this.authServerice.storeRefreshToken(response.refreshToken);
          const tokenPayload = this.authServerice.decodeToken();
          this.userStore.setFullNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.toast.success({detail:"SUCCESS",summary:response.message,duration:5000});
          this.router.navigate(['dashboard']);
        },
        error:()=>{
          this.toast.error({detail:"ERROR",summary:"Something when wrong!",duration:5000});
        }
      })


    }else{
      console.log("Form is not valid");

      //throw the error using toaster and with required fields
      ValidateForm.validateAllFormsFields(this.loginForm);
      alert("Your Form Invalid");

    }
  }
  checkValidEmail(event:string){
    const value =event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  comfirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
      
      //Api Call to be done
      this.resetPassword.sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe({
        next:(res)=>{
          this.toast.success({
            detail:"SUCCESS",summary:"Reset Success!",
            duration:3000
          })
          this.resetPasswordEmail = '';
          const buttonRef =document.getElementById("closeBtn");
          buttonRef?.click();
        },
        error:(err)=>{
          this.toast.error({
            detail:"ERROR",summary:"smothing Went Wrong!",
            duration:3000
          });
        }
      })
    }
  }

}
