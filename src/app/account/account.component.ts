import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UsersService } from '../services/users.service'


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currentUser: any;
  username:string;
  role:string;
  user: any;
  id: any;

  constructor(private router: Router, private userService: UsersService) { }

  user_data;

  ngOnInit(): void {
    // if(this.userService.active_user) {
    //   this.currentUser = this.userService.active_user;
    // } else {
    //   alert ("Please sign in")
    //   this.router.navigateByUrl('/login');
    // }
  }

  //Takes the user to the edit profile page
  public editProfile() {
    this.router.navigateByUrl('/profile')
  }
  
  //Clears the localstorage user session and redirects back to the other page.
  public signOut(){
    if(this.userService.active_user) {
      localStorage.clear();
      this.router.navigate(['/login']);
      window.location.reload();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
