import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
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


  constructor(private fb:FormBuilder,private authServerice:AuthService,private router:Router){}
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
          alert(response.message);
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);
        },
        error:(err)=>{
          alert(err?.error.message);
        }
      })


    }else{
      console.log("Form is not valid");

      //throw the error using toaster and with required fields
      ValidateForm.validateAllFormsFields(this.loginForm);
      alert("Your Form Invalid");

    }
  }




}
