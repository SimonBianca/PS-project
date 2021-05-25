import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-old-appointments',
  templateUrl: './old-appointments.component.html',
  styleUrls: ['./old-appointments.component.css']
})
export class OldAppointmentsComponent implements OnInit {
  account:Account;
  user: User;
  appointments:Appointment[];
  displayedColumns: string[] = ['date','services','status'];
  constructor(private userService:UserService)  { }

  ngOnInit(): void {
    this.userService.getOldAppointments(localStorage.getItem('id')).subscribe(res => {
      this.appointments = res;
    },
    error => {
      console.log(error);
      this.appointments=[];
     } );
  }

  exportData(){
    this.userService.exportOldAppointments(localStorage.getItem('id')).subscribe(res=>{
      if(res){
        let typeForBlob='text/xml;charset=utf-8';
        let blob=new Blob([res],{type:typeForBlob});
        saveAs(blob,"old-appointments.xml");
      }
    })
  }

}
