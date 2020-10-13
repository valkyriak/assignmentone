import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users.service';

const BACKEND_URL = 'http://localhost:3000';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, private httpClient: HttpClient, private userService: UsersService) { }

  username: string;
  password: string;
  active_user: boolean = false;
  loginDetails = null;

  public error: any;


  //Checks for active user on load, if already signed in gets redirected to main page.
  ngOnInit() {
    if (this.userService.active_user) {
        this.router.navigateByUrl('/main');
    }
    this.loginDetails = {username: this.username, password: this.password};
  }

  //Login user function, hooks via the backend url to the auth route to acquire login details from the database
  loginUser() {
    console.log("login button pressed")
      this.httpClient.post(BACKEND_URL + '/api/auth', this.loginDetails).subscribe((data: any) => {
          console.log(this.loginDetails)
          if (data.code == 1 || data.code == 2) {
              this.error = data;
          } else {
              localStorage.setItem('active-user', JSON.stringify(
                  {
                      "user": data,
                      "session": true
                  }
              ));
          }
      });
  }
}
