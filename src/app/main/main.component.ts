import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { User } from '../user';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentUser:User;
  username:string = "";
  id:number =0;
  role:string ='';
  email:string = '';

  room:String;
  newMessage:String;
  messageArray:Array<{user:String, message:String}> = [{user:"yeet", message:"ka"},{user:"array", message:"not"}];
 
  ioConnection:any;

  constructor(private socketService: SocketService, private router: Router) { 
    
        this.socketService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));

        this.socketService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this.socketService.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));

  }

    // Joins the current user to their selected room
    join(){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.socketService.joinRoom({user:this.currentUser.username, room:this.room});
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

}

