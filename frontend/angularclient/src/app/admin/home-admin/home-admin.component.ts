import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  stompClient:any;
  id:number;
  appointments:Appointment[];
  constructor( private router:Router,private snackBar:MatSnackBar,
    private userService:UserService) { }

  ngOnInit(): void {
    var nr=0;
    this.userService.getOnWaitingAppointments(localStorage.getItem('id')).subscribe(res => {
      this.appointments = res;
      nr=this.appointments.length;
      if(nr>0){
        this.snackBar.open("There is/are "+nr+" appointmet/s on waiting!", "Close",{
          duration:7000
        });
      }
    },
    error => {
      console.log(error);
      this.appointments=[];
     } );
  }

  goToAccountList():void{
    this.router.navigate(["admin/accounts"]);
  }

  goToServiceList():void{
    this.router.navigate(["admin/services"]);
  }

  goToAccountDetails():void{
    this.router.navigate(["admin/details"]);
  }

  goToOldAppointments():void{
    this.router.navigate(["admin/old-appointments"]);
  }

  goToFutureAppointments():void{
    this.router.navigate(["admin/future-appointments"]);
  }

  goToOnWaitingAppointments():void{
    this.router.navigate(["admin/on-waiting-appointments"]);
  }

  goToAppointments():void{
    this.router.navigate(["admin/appointments"]);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    this.router.navigate(["login"]);
  }

}
