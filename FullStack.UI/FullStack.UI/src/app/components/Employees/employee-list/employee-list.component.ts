import { Component,OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/Services/employees.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [
    // {
    //   id:'1',
    //   name:'sureehf',
    //   email:'surekhds@gmail.com',
    //   phone:902434335,
    //   salary:873548,
    //   department:'.net developer'
    // },
    // {
    //   id:'2',
    //   name:'suree',
    //   email:'sure@gmail.com',
    //   phone:902434335,
    //   salary:473548,
    //   department:'Node JS developer'
    // },
    // {
    //   id:'3',
    //   name:'sureedgshf',
    //   email:'surefhd@gmail.com',
    //   phone:902434335,
    //   salary:73548,
    //   department:'Angular developer'
    // }
  ]
  constructor(private employeeService:EmployeesService){

  }
  ngOnInit(){
    this. getAllEmployees();
  }
  getAllEmployees(){
    this.employeeService.getAllEmployee().subscribe({
     next:(employees)=>{
     // console.log(employees);
     this.employees =employees;

     },
     error:(response)=>{
      console.log(response);
     }
    })
  }

}
