import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  type:string="password";
  isText:boolean=false;
  eyeIcon:string= "fa-eye-slash";
  signUpForm!:FormGroup;

  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
  this.signUpForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
  })

  }
  hideShowPass(){
    this.isText =!this.isText;
    this.isText ? this.eyeIcon ="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText ? this.type ='text':this.type ="password";
  }
onSignUp(){
  if(this.signUpForm.valid){
    //preform logic for signup
    console.log(this.signUpForm.value);

  }else{
    // logic for throwing error
    ValidateForm.validateAllFormsFields(this.signUpForm);
    alert("Your Form is Invalid");
  }
}


}
