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

  messagecontent:string = "";
  messages:string[] = [];
  ioConnection:any;

  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit(): void {
    this.initIoConnection();
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

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message:string) => {
        //add new message to the messages array.
        this.messages.push(message);
      });
  }
  
  public send() {
    if(this.messagecontent){
      //check there is a message to send
      this.socketService.send(this.messagecontent);
      this.messagecontent=null;
    }else{
      console.log("no message");
    }
  }

}

