import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-old-appointmets-list',
  templateUrl: './old-appointmets-list.component.html',
  styleUrls: ['./old-appointmets-list.component.css']
})
export class OldAppointmetsListComponent implements OnInit {
  account:Account;
  user: User;
  appointments:Appointment[];
  displayedColumns: string[] = ['date','services','status','username'];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getOldAppointments(localStorage.getItem('id')).subscribe(res => {
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
}
