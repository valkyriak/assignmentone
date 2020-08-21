import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username:string;
  password:string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    var usernames = [
      "admin1",
      "admin2",
      "admin3",
    ];
    var passwords = [
      "password1",
      "password2",
      "password3"
    ]
    for (var i = 0; i < usernames.length; i++){
      if(this.username == usernames[i] && this.password == passwords[i] ) {
        alert('Success!')
        this.router.navigateByUrl('/account')
        break;
      }
    }
  }

}
