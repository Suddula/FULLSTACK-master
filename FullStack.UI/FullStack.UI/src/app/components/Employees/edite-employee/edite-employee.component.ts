import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'src/app/Services/employees.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-edite-employee',
  templateUrl: './edite-employee.component.html',
  styleUrls: ['./edite-employee.component.scss']
})
export class EditeEmployeeComponent implements OnInit{

  employeeDetails:Employee ={
    id:'',
    name:'',
    email:'',
    phone:0,
    salary:0,
    department:''

  }

  constructor(private route:ActivatedRoute,private employeeService:EmployeesService,private router:Router){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
       const id = params.get('id');

       if(id){
        //call Api
        this.employeeService.getEmployee(id)
        .subscribe({
          next:(response)=>{
            this.employeeDetails =response;

          }
        })
       }
      }
    })

  }
  updateEmployee(){
    this.employeeService.updateEmployee(this.employeeDetails.id,this.employeeDetails)
    .subscribe({
      next:(response)=>{
        this.router.navigate(['employees']);

      }
    })
  }

  deleteEmployee(id:string){
    this.employeeService.deleteEmployee(id)
    .subscribe({
      next:(response)=>{
        this.router.navigate(['employees']);
      }
    })
  }
}
