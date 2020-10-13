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

    get user_info() { return this._user_info; }

    public fetchUsersData(id: string): Observable<any> {
        return this.httpClient.get('/api/users/' + id);
    }

    public fetchUsers(): Observable<any> {
        return this.httpClient.get('/api/users/');
    }

}