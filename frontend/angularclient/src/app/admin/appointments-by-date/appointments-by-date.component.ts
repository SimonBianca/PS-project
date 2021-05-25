import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from 'src/app/model/account';
import { Appointment } from 'src/app/model/appointment';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-appointments-by-date',
  templateUrl: './appointments-by-date.component.html',
  styleUrls: ['./appointments-by-date.component.css']
})
export class AppointmentsByDateComponent implements OnInit {
  dateForm:FormGroup;
  date:Date;
  account:Account;
  appointments:Appointment[];
  displayedColumns: string[] = ['date','services','status','username'];
  constructor(private formBuilder:FormBuilder,private snackBar:MatSnackBar,
    private userService:UserService) {
   }

  ngOnInit(): void {
    this.dateForm=this.formBuilder.group({
      date:[null,[Validators.required]]
    })
  }

  searchAppointments(){
    if(this.dateForm.invalid){
      this.snackBar.open("Please fill in the form!", "Close",{
        duration:2000
      });
      return;
    }
    this.date=this.dateForm.value.date;
    this.userService.getAppointmentsByDate(this.date).subscribe(res => {
      if(res!=null){
        this.appointments = res;
        if(this.appointments.length==0){
          this.snackBar.open("There are not appointments on this date!", "Close",{
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

  inputEvent(event){
    this.date=event.value;
  }
  changeEvent(event){
    this.date=event.value;
  }

}
