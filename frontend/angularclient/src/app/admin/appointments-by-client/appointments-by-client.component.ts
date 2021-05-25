import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from 'src/app/model/account';
import { Appointment } from 'src/app/model/appointment';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-appointments-by-client',
  templateUrl: './appointments-by-client.component.html',
  styleUrls: ['./appointments-by-client.component.css']
})
export class AppointmentsByClientComponent implements OnInit {
  clientForm:FormGroup;
  username:string;
  account:Account;
  appointments:Appointment[];
  displayedColumns: string[] = ['date','services','status'];
  constructor(private formBuilder:FormBuilder,private snackBar:MatSnackBar,
    private userService:UserService) { }

  ngOnInit(): void {
    this.clientForm=this.formBuilder.group({
      username:[null,[Validators.required]]
    })
  }

  searchAppointments(){
    if(this.clientForm.invalid){
      this.snackBar.open("Please fill in the form!", "Close",{
        duration:2000
      });
      return;
    }
    this.username=this.clientForm.value.username;
    this.userService.getClientAccount(this.username).subscribe(data=>{
      if(data==null){
        this.snackBar.open("This user doesn't exist!", "Close",{
          duration:4000
        });
      }
      else{
        this.userService.getAppointmentsByClient(this.username).subscribe(res => {
          if(res!=null){
            this.appointments = res;
            if(this.appointments.length==0){
              this.snackBar.open("This user doesn't have appointments!", "Close",{
                duration:4000
              });
            }
            else{
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
            }
          }
        });
      }
    },
      error=>{
        console.log(error);
      })
  }

}
