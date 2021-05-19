import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-future-appointments',
  templateUrl: './future-appointments.component.html',
  styleUrls: ['./future-appointments.component.css']
})
export class FutureAppointmentsComponent implements OnInit {
  account:Account;
  user: User;
  appointments:Appointment[];
  displayedColumns: string[] = ['date','services','status','refuse'];
  constructor(private userService:UserService) { }

  ngOnInit(): void {

    this.userService.getFutureAppointments(localStorage.getItem('id')).subscribe(res => {
      this.appointments = res;
    },
    error => {
      console.log(error);
      this.appointments=[];
     } );
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
