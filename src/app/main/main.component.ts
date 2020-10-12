import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { SocketService } from '../services/socket.service';
import { UsersService } from '../services/users.service';


const BACKEND_URL = 'http://localhost:3000';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //Chat element declarations for parsing data
  newMessage:String;
  messageArray:Array<{user:String, message:String}> = [];
  ioConnection:any;

  constructor(private socketService: SocketService, private router: Router, private httpClient: HttpClient, private userService: UsersService) { }
    
    //User information declarations for parsing data
    private currentUser: boolean;
    private currentUserDetails: any;
    private currentUserIsGA: boolean = false;
   
    public groups = [];
    public group_select: any = null;
  
    public channels: any = null;
    public channel_select: any = null;
  

    // Joins the current user to their selected room and channel
    join(){
      
    }
    // Leaves the current user from their selected room and channel
    leave(){

    }
    //Sends a message to the currently joined chatroom.
    sendMessage(){
      console.log(this.newMessage);
      let data = {username: this.currentUserDetails.username, room: this.channel_select.id, message: this.newMessage};
      this.socketService.sendMessage(data);
      this.newMessage = '';
    }




// On load grab the current user details, grabs groups from local storage
  ngOnInit(): void {

    if(this.userService.current_user) {
      this.currentUser = this.userService.current_user;
    } else {
      alert ("Please sign in")
      this.router.navigateByUrl('/login');
    }

    if (this.currentUser && this.userService.userrole.includes(this.userService.RetrieveUserDetails)) {
      this.currentUserDetails = this.userService.RetrieveUserDetails;
    } else {
      this.router.navigateByUrl('/login');
  }

    this.getGroups()
    this.initChatConnection()


  }

  //Fetches the groups from the server side which then retrieves from mongo
  // Also checks if the current user is a group assistant
  private getGroups() {
    this.groups = [];
    this.httpClient.get(BACKEND_URL + '/api/get-groups', httpOptions).subscribe((data: any) => {
        if (this.currentUserDetails.role == 'super-admin' || this.currentUserDetails.role == 'group-admin') {
            this.groups = data;
        } else {
            data.forEach(group => {
                console.log(group.group_users);
                const activeGA = Boolean(group.group_assistants.find(x => x === this.currentUserDetails.id));
                const activeuser = Boolean(group.group_users.find(x => x === this.currentUserDetails.id));
                if (activeGA || activeuser) {
                    activeGA ? this.currentUserIsGA = true : this.currentUserIsGA = false;
                    this.groups.push(group);
                } else {
                    console.log('not in any groups');
                }
            });
        }
    });
}

//Checks within the groups to find channels, checks current user roles and then displays according data
public getChannels(group) {
  this.channels = [];
  this.httpClient.get(BACKEND_URL + '/api/get-channels/' + group._id, httpOptions).subscribe((data: any) => {
    if (this.currentUserDetails.role == 'super-admin' || this.currentUserDetails.role == 'group-admin' || this.currentUserIsGA ) {
      this.channels = data;
    } else {
      data.forEach(channel => {
        console.log(channel);
        const active = Boolean(channel.channel_users.find(i => i == this.currentUserDetails.id));
        if (active) {
          this.channels.push(channel)
        } else {
          console.log("not in any channels currently");
        }
      });
    }
  });
}


public channelSelect(channel) {
  this.channel_select = channel;
}


//Initialises chat functionality
private initChatConnection() {
  this.socketService.newMessageReceived()
  .subscribe(data => this.messageArray.push(data));

  this.socketService.newUserJoined()
  .subscribe(data => this.messageArray.push(data));

  this.socketService.userLeftRoom()
  .subscribe(data => this.messageArray.push(data));
}


}

