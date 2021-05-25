import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToAppointmentsByClient(){
    this.router.navigate(['admin/appointments/client']);
  }
  goToAppointmentsByDate(){
    this.router.navigate(['admin/appointments/date']);
  }

  goToAppointmentsByDates(){
    this.router.navigate(['admin/appointments/between-dates']);
  }

}
