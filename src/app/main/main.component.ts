import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http'

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

  //User information declarations for parsing data
  currentUser:User;
  username:string = "";
  id:number =0;
  role:string ='';
  email:string = '';

  room:String;

  group:Array<{id:Number, group_name:String, users:Array<String>}> = [];
  groups:Array<{id:Number, group_name:String, users:Array<String>}> = [];
  
  channels:Array<{id:Number, group_name:String, users:Array<String>}> = [];
  channel:String;

  //Chat element declarations for parsing data
  newMessage:String;
  messageArray:Array<{user:String, message:String}> = [];
 
  ioConnection:any;

  constructor(private socketService: SocketService, private router: Router, private httpClient: HttpClient) { 
  

  }

    // Joins the current user to their selected room
    join(){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.socketService.joinRoom({user:this.currentUser.username, room:this.room});
      alert("you have joined the room")
    }
    // Leaves the current user from their selected room
    leave(){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.socketService.leaveRoom({user:this.currentUser.username, room:this.room});
    }
    //Sends a message to the currently joined chatroom.
    sendMessage(){
      console.log(this.newMessage);
        this.socketService.sendMessage({user:this.currentUser.username, room:this.room, message:this.newMessage});
    }




// On load grab the current user details from local storage
  ngOnInit(): void {

    this.getGroups()
    this.initChatConnection()
    
      try {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(this.currentUser){
          this.email = this.currentUser.email;
          this.username = this.currentUser.username;
          this.role = this.currentUser.role;
          this.id = this.currentUser.id;
        }
      }
      catch(err){
        alert ("Not logged in");
        this.router.navigateByUrl('/login');
      }
  }

  //Fetches the groups from JSON file
  public getGroups() {

    this.httpClient.post(BACKEND_URL + '/api/groups', httpOptions)
    .subscribe((data: any) => {
        if (data) {
            data.forEach(g => {
                g.users.forEach(user => {
                    if (user == this.username) {
                        this.groups.push(g);
                    }
                });
            });
        } else {
            alert('No groups, please add some in the admin panel');
        }

    });
}

// public getUsers() {
//   this.httpClient.post(BACKEND_URL + '/api/users', httpOptions)
//   .subscribe((data: any) => {
//     if (data) {
//       data.forEach(u => {
//         if (u.user == this.username)
//             this.group.push(u);
//       })
//     }

//   });
// }


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

