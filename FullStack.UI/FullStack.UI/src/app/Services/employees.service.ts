import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
baseapiurl :string=environment.EMPLOYEE_API_URL;
constructor(private http:HttpClient) { }

  getAllEmployee():Observable<Employee[]>{

    return this.http.get<Employee[]>(this.baseapiurl+'/employees');

  }
  addEmployee(addEmployeeRequest:Employee): Observable<Employee> {
    addEmployeeRequest.id ="00000000-0000-0000-0000-000000000000";
    return this.http.post<Employee>(this.baseapiurl + '/employees', addEmployeeRequest);
  }
  getEmployee(id:string) :Observable<Employee>{
    return this.http.get<Employee>(this.baseapiurl+'/employees/'+id);
  }
  updateEmployee(id:string,updateEmployeeRequest:Employee):Observable<Employee>{

   return this.http.put<Employee>(this.baseapiurl+'/employees/'+id,updateEmployeeRequest);
  }

  deleteEmployee(id:string):Observable<Employee>{
    return this.http.delete<Employee>(this.baseapiurl+'/employees/'+id);

  }
}
