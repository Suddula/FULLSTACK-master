import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public fullName : string ="";
  constructor(private router:Router,private toast:NgToastService,private auth:AuthService,private userStore:UserStoreService){}

  ngOnInit(){
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val ||fullNameFromToken;

    });
  }

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
