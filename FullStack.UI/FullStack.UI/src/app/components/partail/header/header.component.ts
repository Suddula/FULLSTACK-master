import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router:Router,private toast:NgToastService,private auth:AuthService){}


  logOut(){
    // this.toast.success({detail:"SUCCESS",summary:"Do you want to logout"});
    // const confirmation = confirm("Do you want to logout");
    // if(confirmation){
    //   localStorage.removeItem('token');
    //   this.router.navigate(['login']);
    // }
   this.auth.signOut();

}
}
