import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/Employees/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/Employees/add-employee/add-employee.component';
import { EditeEmployeeComponent } from './components/Employees/edite-employee/edite-employee.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { ResetComponent } from './components/reset/reset.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'singup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[authGuard,roleGuard],data:{
    role:"ADMIN"
  }},
  {path:'reset',component:ResetComponent},
  {path:'employees',component:EmployeeListComponent},
  {path:'employees/add',component:AddEmployeeComponent,canActivate:[authGuard]},
  {path:'employees/edit/:id',component:EditeEmployeeComponent,canActivate:[authGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
