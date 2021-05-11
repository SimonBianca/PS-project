import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularclient';
  stompClient:any;
  id:number;
  
  constructor(private route:Router,private snackBar:MatSnackBar){}

  
  ngOnInit(): void {
    if(localStorage.getItem('role')=="ADMIN"){
      this.subscribeToNotifications(Number(localStorage.getItem('id')));
    }
    else{
      this.subscribeToNotifications2(Number(localStorage.getItem('id')));
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    this.stompClient.disconnect();
    this.route.navigate(["login"]);
  }

  get isUserLoggedIn() {
    return !!localStorage.getItem('token');
  }

  subscribeToNotifications(accountId:number){
    const URL="http://localhost:8080/socket";
    const websocket=new SockJS(URL);
    this.stompClient=Stomp.over(websocket);
    this.stompClient.connect({},()=>{
      this.stompClient.subscribe('/topic/socket/admin/', notification=>{
        let message=notification.body;
        this.snackBar.open(message,'Close',{
          duration:5000
        })
      })
    });
  }

  subscribeToNotifications2(accountId:number){
    var id=accountId.toString;
    const URL="http://localhost:8080/socket";
    const websocket=new SockJS(URL);
    this.stompClient=Stomp.over(websocket);
    this.stompClient.connect({},()=>{
      this.stompClient.subscribe(`/topic/socket/client/${accountId}`, notification=>{
        let message=notification.body;
        this.snackBar.open(message,'Close',{
          duration:5000
        })
      })
    });
  }
}
