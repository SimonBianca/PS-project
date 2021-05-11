import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/appointment';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-on-waiting-appointments-list',
  templateUrl: './on-waiting-appointments-list.component.html',
  styleUrls: ['./on-waiting-appointments-list.component.css']
})
export class OnWaitingAppointmentsListComponent implements OnInit {
  appointments:Appointment[];
  displayedColumns: string[] = ['date','services','status','refuse'];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getOnWaitingAppointments(localStorage.getItem('id')).subscribe(res => {
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
