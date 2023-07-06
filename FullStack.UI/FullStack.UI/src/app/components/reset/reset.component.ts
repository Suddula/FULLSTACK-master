import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
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
  resetPasswordForm!:FormGroup;
  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;

  public resetPasswordModel:any ={};

constructor(private fb:FormBuilder,
  // private authServerice:AuthService,
  private router:Router,
  private toast:NgToastService,
  // private userStore:UserStoreService,
  private resetPassword:ResetPasswordService,
  private activateRoute: ActivatedRoute){
    this.resetPasswordModel = new ResetPassword();
}
ngOnInit(){
  this.resetPasswordForm = this.fb.group({

    password:['',Validators.required],
    confirmpassword:['', Validators.required]

  })
}
  hideShowPass(){
    this.isText =!this.isText;
    this.isText ? this.eyeIcon ="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText ? this.type ='text':this.type ="password";
  }
  reset(){
    this.activateRoute.queryParams.subscribe((query: Params) => {
  
      this.resetPasswordModel.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordModel.confirmPassword = this.resetPasswordForm.value.confirmpassword;
      this.resetPasswordModel.email = query?.['email'];
      this.resetPasswordModel.emailToken = query?.['code'];
    });
    console.log(this.resetPasswordForm.value,String(this.activateRoute.snapshot.paramMap.get('email')));
    if(this.resetPasswordForm.valid){

      this.resetPassword.resetPassword(this.resetPasswordModel)
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
