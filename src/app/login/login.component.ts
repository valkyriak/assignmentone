import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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


  username = "";
  password = "";

  user = {username: this.username, password: this.password};  

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() { 
  }

  public loginUser() {
    console.log(this.user);

    this.httpClient.post(backUrl + '/api/auth', this.user, httpOptions)
    .subscribe((data: any) => {
      if (data.ok) {
        console.log('response looks good');
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('birthdate', data.birthdate);
        sessionStorage.setItem('age', data.age.toString());
        sessionStorage.setItem('email', data.email)
        sessionStorage.setItem('status', data.ok.toString())
        this.router.navigateByUrl("/account")
      } else {
        alert("Invalid credentials");
        sessionStorage.clear();
        sessionStorage.setItem('status', "false");
      }
  
    });
  }

  // public loginUser(){
  //   //event.preventDefault();

  //   console.log(this.username, this.password);
    
  //   this.httpClient.post<any>(backUrl + '/api/auth', {username: this.username, password: this.password}, httpOptions).subscribe((data: any) => {
  //     if (data.ok) {
  //       sessionStorage.setItem('username', data.username);
  //       sessionStorage.setItem('birthdate', data.birthdate);
  //       sessionStorage.setItem('age', data.age.toString());
  //       sessionStorage.setItem('email', data.email)
  //       sessionStorage.setItem('status', data.ok.toString())
  //       this.router.navigateByUrl("/account")
  //     } else {
  //       alert("Invalid credentials");
  //       sessionStorage.clear();
  //       sessionStorage.setItem('status', "false");
  //     }
  //   });
  // }

}



