import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';
import { ConfirmPasswordValidator } from 'src/app/helpers/confirm-password.validator';
import ValidateForm from 'src/app/helpers/validateform';
import { ResetPassword } from 'src/app/models/reset-password.model';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {
  type:string="password";
  isText:boolean=false;
  eyeIcon:string= "fa-eye-slash";
 
  // public resetPasswordEmail!:string;
  public isValidEmail!:boolean;
  // public resetPasswordModel:any ={};


  // youtub 
  resetPasswordForm!:FormGroup;
  emailToReset!:string;
  emailToken!:string;
  resetPasswordObj = new ResetPassword();

constructor(private fb:FormBuilder,
  private activateRoute: ActivatedRoute,
  private router:Router,
  private toast:NgToastService,
  private resetPassword:ResetPasswordService,
 ){
    // this.resetPasswordModel = new ResetPassword();
}
ngOnInit(){
  this.resetPasswordForm = this.fb.group({
    password:['',Validators.required],
    confirmpassword:['', Validators.required],
  },{
    validator:ConfirmPasswordValidator("password","confirmpassword")
  });
  this.activateRoute.queryParams.subscribe((query: Params) => {
    this.emailToReset = query['email'];
    let urlToken = query['code']
    this.emailToken = urlToken.replace(/ /g,'+');
  });

}
  hideShowPass(){
    this.isText =!this.isText;
    this.isText ? this.eyeIcon ="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText ? this.type ='text':this.type ="password";
  }
  reset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword =this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;

      this.resetPassword.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(res)=>{
          this.toast.success({
            detail:"SUCCESS",summary:"PassWord Succesfully Reset",duration:3000
          })
          this.router.navigate(['/login']);
        },
        error:(err)=>{
          this.toast.error({
            detail:"ERROR",summary:"smothing Went Wrong!",
            duration:3000
          });
        }
      })

    }else{
      //throw the error using toaster and with required fields
      ValidateForm.validateAllFormsFields(this.resetPasswordForm);
      alert("Your Form Invalid");
    }

  }
}
