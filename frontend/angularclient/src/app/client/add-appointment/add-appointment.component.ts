import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { Service } from 'src/app/model/service';
import { ServicesService } from 'src/app/service/services.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  appointment:Appointment;
  servicesControl:FormControl;
  services:Service[];
  date:Date;
  minDate:Date;
  servicesList:string;
  constructor(private router:Router,private userService:UserService,
    private snackBar:MatSnackBar, private servicesService:ServicesService) {
      this.appointment=new Appointment();
      const currentYear=new Date().getFullYear();
      const currentMonth=new Date().getMonth();
      const currentDay=new Date().getDate();
      this.minDate=new Date(currentYear,currentMonth,currentDay);
      this.servicesControl=new FormControl();
     }

  ngOnInit(): void {
    this.servicesService.getAllServices().subscribe(data => {
      this.services = data;
    },
    error => {
      console.log(error);
      this.services=[];
     } );
  }

  addAppointment():void{
    var that=this;
    this.appointment.services=[];
    this.servicesControl.value.forEach(function(item){
      if(that.servicesService.getServiceByName(that.services,item)!=null){
        that.appointment.services.push(that.servicesService.getServiceByName(that.services,item));
      }
    });
    this.appointment.date=this.date;
    this.userService.getAccountById(localStorage.getItem('id')).subscribe(res => {
      this.appointment.account = res;
      this.userService.addAppointment(this.appointment).subscribe(
        data => {
          this.appointment = data;
          this.router.navigate(["client"]);
        },
        error => this.snackBar=error
      );
    },
    error => {
      console.log(error);
      this.appointment.account=null;
     } );
  }

  inputEvent(event){
    this.date=event.value;
  }
  changeEvent(event){
    this.date=event.value;
  }

}
