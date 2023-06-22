import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { EmployeesService } from 'src/app/Services/employees.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit{
  addEmployeeRequest:Employee = {
    id:'',
    name:'',
    email:'',
    phone:0,
    salary:0,
    department:''

  }
 constructor(private employeeService:EmployeesService,private router:Router){

 }
 ngOnInit(){

 }
 addEmployee(){
 // console.log(this.addEmployeeRequest);
  this.employeeService.addEmployee(this.addEmployeeRequest).subscribe({
    next:(employee)=>{
      // console.log(this.addEmployeeRequest);
      this.router.navigate(['employee']);
    },
    error:(response)=>{
      console.log(response);
    }
  });
 }
}
