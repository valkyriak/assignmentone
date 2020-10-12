import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private currentuser:boolean = false;
  private userdetails;

  userrole = ["super-admin", "group-admin", "group-assistant", "user"];

  constructor(private httpClient: HttpClient) { }

  // Pulls users 
  public RequestUsers(): Observable<any> {
    return this.httpClient.get('/api/getusers/');
  }

  //Gets user details by ID
  public RequestUserDetails(id: string): Observable<any> {
    return this.httpClient.get('/api/users/' + id)
  }

  // Retrieves the current user session from local storage for use on other pages
  get current_user() {
    if(localStorage.getItem("current-user")) {
      let storage = JSON.parse(localStorage.getItem("current-user"));
      this.userdetails = storage.user;
      this.currentuser = storage.session;
      return this.currentuser
    }
  }
  // Sets status after retrieval
  set current_user(status) {
    this.currentuser = status
  }
  
  // Returns user details
  get RetrieveUserDetails() {
    return this.userdetails
  }

  
}
