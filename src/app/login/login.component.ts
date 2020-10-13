import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users.service';


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

  ngOnInit() {
      if (this.userService.active_user) {
          this.router.navigateByUrl('/main');
      }
      this.loginDetails = {username: this.username, password: this.password};
  }

  login() {
    console.log("login button pressed")
      this.httpClient.post('/api/auth', this.loginDetails).subscribe((data: any) => {
          if (data.code == 1 || data.code == 2) {
              console.log(data.code)
              this.error = data;
          } else {
              localStorage.setItem('active-user', JSON.stringify(
                  {
                      "user": data,
                      "session": true
                  }
              ));
              location.reload();
          }
      });
  }
}
