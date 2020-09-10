import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currentUser:User;
  username:string = "";
  id:number =0;
  role:string ='';
  email:string = '';

  constructor(private router: Router) { }


  ngOnInit(): void {
    try {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if(this.currentUser){
        this.email = this.currentUser.email;
        this.username = this.currentUser.username;
        this.role = this.currentUser.role;
        this.id = this.currentUser.id;
      }
    }
    catch(err){
      alert ("Not logged in");
      this.router.navigateByUrl('/login');
    }
  }

  public editProfile() {
    this.router.navigateByUrl('/profile')
  }
  public signOut(){
    localStorage.setItem('currentUser', '');
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
