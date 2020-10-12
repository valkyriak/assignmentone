import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  currentUser:User;
  username:string = "";
  email:string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    try {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if(this.currentUser){
        this.email = this.currentUser.email;
        this.username = this.currentUser.username;
      }
    }
    catch(err){
      console.log("Not logged in");
    }
  }

}
