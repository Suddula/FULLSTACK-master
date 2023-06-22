import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/Employees/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/Employees/add-employee/add-employee.component';
import { EditeEmployeeComponent } from './components/Employees/edite-employee/edite-employee.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'singup',component:SignupComponent},
  {path:'',component:EmployeeListComponent},
  {path:'employees',component:EmployeeListComponent},
  {path:'employee/add',component:AddEmployeeComponent},
  {path:'employee/edit/:id',component:EditeEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
