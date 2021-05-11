import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'src/app/model/account';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-future-appointmets-list',
  templateUrl: './future-appointmets-list.component.html',
  styleUrls: ['./future-appointmets-list.component.css']
})
export class FutureAppointmetsListComponent implements OnInit {
  account:Account;
  user: User;
  appointments:Appointment[];
  data:any;
  displayedColumns: string[] = ['date','services','status','refuse','username'];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getFutureAppointments(localStorage.getItem('id')).subscribe(res => {
      this.appointments = res;
      this.appointments.forEach(element => {
        this.userService.getAppointmentAccount(element).subscribe(data=>{
          this.account=data;
          element.account=this.account;
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
}
