import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { User } from '../user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// import { User } from 'server/model/user';

const backUrl = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id:number = 0;
  email:string = "";
  username:string = "";
  password:string = "";
  role:string = "";
  newuser:User;



  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() { 

    
  }

  public loginUser() {
    let user = {username: this.username, password: this.password};
    this.httpClient.post(backUrl + '/api/auth', user, httpOptions).subscribe((data:any) => {
        if (data.ok){
          this.newuser = new User(data.id, data.username, data.email, data.password, data.role, data.ok)
          localStorage.setItem('currentUser', JSON.stringify(this.newuser));
          alert("Successfully logged in")
          this.router.navigateByUrl("/main");
        } else {
          alert ("Sorry, account credentials are not valid");
        }
  
    });
  }

}



