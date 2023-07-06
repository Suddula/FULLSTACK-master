import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/Employees/employee-list/employee-list.component';
import { HeaderComponent } from './components/partail/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { NgToastModule } from 'ng-angular-popup'
import { EditeEmployeeComponent } from './components/Employees/edite-employee/edite-employee.component';
import { AddEmployeeComponent } from './components/Employees/add-employee/add-employee.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SideBarComponent } from './components/partail/side-bar/side-bar.component';
import { ResetComponent } from './components/reset/reset.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    HeaderComponent,
    AddEmployeeComponent,
    EditeEmployeeComponent,
    RegisterComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    SideBarComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
