import { Component } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public users: any =[];
  constructor(private api:ApiService){

  }
  ngOnInit(){
    this.getUsers();
  }
  getUsers(){
    this.api.getUsers().subscribe(res=>{
      this.users = res;

    })
  }

}
