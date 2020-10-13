import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private _active_user:boolean = false;
    private _user_info;
    roles = ["super-admin", "group-admin", "group-assistant", "user"];

    constructor(private httpClient: HttpClient) { }

    //Used for pages that require active user information aka all of them
    get active_user() {
        if(localStorage.getItem("active-user")) {
            let storage = JSON.parse(localStorage.getItem("active-user"));
            this._user_info = storage.user;
            this._active_user = storage.session;
            return this._active_user;
        }
    }
    set active_user(status) {
        this._active_user = status
    }

    //Used for returning user info
    get user_info() { return this._user_info; }

    //Fetches user info
    public fetchUsersData(id: string): Observable<any> {
        return this.httpClient.get('/api/users/' + id);
    }

    //Fetches actual users
    public fetchUsers(): Observable<any> {
        return this.httpClient.get('/api/users/');
    }

}