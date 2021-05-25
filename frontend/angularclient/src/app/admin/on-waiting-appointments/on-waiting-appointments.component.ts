import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'src/app/model/account';
import { Appointment } from 'src/app/model/appointment';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-on-waiting-appointments',
  templateUrl: './on-waiting-appointments.component.html',
  styleUrls: ['./on-waiting-appointments.component.css']
})
export class OnWaitingAppointmentsComponent implements OnInit {
  appointments:Appointment[];
  account:Account;
  displayedColumns: string[] = ['date','services','status','accept','refuse','username'];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getOnWaitingAppointments(localStorage.getItem('id')).subscribe(res =>{
      this.appointments = res;
      this.appointments.forEach(element => {
        this.userService.getAppointmentAccount(element).subscribe(data=>{
          this.account=data;
          element.accountUsername=this.account.username;
        },
        error => {
          console.log(error);
      });
    },
    error => {
      console.log(error);
      this.appointments=[];
     } );
    });
  }

    delete(index:number,appointment:Appointment):void{
      this.userService.refuseAppointment(appointment).subscribe(res=>{
        appointment=res;
        window.location.reload();
      },
      error => {
        console.log(error);
      });
    }

    accept(index:number,appointment:Appointment):void{
      this.userService.acceptAppointment(appointment).subscribe(res=>{
        appointment=res;
        window.location.reload();
      },
      error => {
        console.log(error);
      });
    }

}
