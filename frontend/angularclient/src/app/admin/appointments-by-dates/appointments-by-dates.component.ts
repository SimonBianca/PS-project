import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from 'src/app/model/account';
import { Appointment } from 'src/app/model/appointment';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-appointments-by-dates',
  templateUrl: './appointments-by-dates.component.html',
  styleUrls: ['./appointments-by-dates.component.css']
})
export class AppointmentsByDatesComponent implements OnInit {
  dateForm:FormGroup;
  startDate:Date;
  endDate:Date;
  account:Account;
  appointments:Appointment[];
  displayedColumns: string[] = ['date','services','status','username'];
  constructor(private formBuilder:FormBuilder,private snackBar:MatSnackBar,
    private userService:UserService) { }

  ngOnInit(): void {
    this.dateForm=new FormGroup({
      startDate:new FormControl(null,Validators.required),
      endDate:new FormControl(null,Validators.required)
    });
  }

  searchAppointments(){
    if(this.dateForm.invalid){
      this.snackBar.open("Please fill in the form!", "Close",{
        duration:2000
      });
      return;
    }
    this.startDate=this.dateForm.controls.startDate.value;
    this.endDate=this.dateForm.controls.endDate.value;
    this.userService.getAppointmentsByDates(this.startDate,this.endDate).subscribe(res => {
      if(res!=null){
        this.appointments = res;
        if(this.appointments.length==0){
          this.snackBar.open("There are not appointments between these dates!", "Close",{
            duration:4000
          });
        }
        else{
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
        }
      }
    });
  }

}
