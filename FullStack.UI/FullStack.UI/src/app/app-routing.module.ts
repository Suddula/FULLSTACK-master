import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/Employees/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/Employees/add-employee/add-employee.component';
import { EditeEmployeeComponent } from './components/Employees/edite-employee/edite-employee.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'singup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
  {path:'dashboard/employees',component:EmployeeListComponent},
  {path:'dashboard/employee/add',component:AddEmployeeComponent},
  {path:'dashboard/employee/edit/:id',component:EditeEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
