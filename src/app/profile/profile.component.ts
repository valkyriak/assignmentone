import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  username = sessionStorage.getItem('username');
  birthdate = sessionStorage.getItem('birthdate');
  age = sessionStorage.getItem('age');
  email = sessionStorage.getItem('email');
  status = sessionStorage.getItem('status');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public saveProfile() {
    sessionStorage.setItem('username', this.username);
    sessionStorage.setItem('birthdate', this.birthdate);
    sessionStorage.setItem('age', this.age);
    sessionStorage.setItem('email', this.email)
    this.router.navigateByUrl('/account')
  }

  public cancelProfile() {
    this.router.navigateByUrl('/account')
  }
}
