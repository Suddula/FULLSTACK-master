import { Component } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public users: any =[];
  public role:string = '';
  
  constructor(private api:ApiService,private auth:AuthService,private userStore:UserStoreService){
    console.log("befor role" +this.role);
    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getroleFromToken();
      this.role = val || roleFromToken;
    
    });
    
  }
  ngOnInit(){
    this.api.getUsers()
    .subscribe(res=>{
      this.users = res;
    });
  }

}
