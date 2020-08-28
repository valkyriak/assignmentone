import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username = sessionStorage.getItem('username');
  birthdate = sessionStorage.getItem('birthdate');
  age = sessionStorage.getItem('age');
  email = sessionStorage.getItem('email');
  status = sessionStorage.getItem('status');

  constructor(private router: Router) { }


  ngOnInit(): void {
  }

  public editProfile() {
    this.router.navigateByUrl('/profile')
  }
  public signOut(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
