import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from 'src/app/model/account';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  public account:Account;
  public user: User;
  accountForm:FormGroup;
  constructor(private userService:UserService,private snackBar:MatSnackBar,
    private formBuilder:FormBuilder) { 
  }
  ngOnInit(): void {
    this.userService.getAccountById(localStorage.getItem('id')).subscribe(res => {
      this.account = res;
      this.accountForm=this.formBuilder.group({
        username:[this.account.username,[Validators.required]],
        password:[this.account.password,[Validators.required,Validators.minLength(8)]],
        firstName:[this.account.user.firstName,Validators.required],
        lastName:[this.account.user.lastName,Validators.required],
        email:[this.account.user.email,[Validators.required,Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        phone:[this.account.user.phone,[Validators.required, Validators.pattern("07[0-9]{8}$")]],
        age:[this.account.user.age,[Validators.required,Validators.pattern("[1-9]{1}[0-9]{1}$")]]
      })
    },
    error => {
      console.log(error);
      this.account=null;
     } );
  }

  updateUsername():void{
    this.account.username=this.accountForm.value.username;
    this.userService.updateUsername(this.account).subscribe(
      resp=>{
        if(resp==null){
          this.snackBar.open("This username already exists!", "Close",{
            duration:2000
          });
          this.accountForm.patchValue({
            username: ""
          })
        }
      },
      error => this.snackBar=error
    );
  }

  updatePassword():void{
    this.account.password=this.accountForm.value.password;
    this.userService.updatePassword(this.account).subscribe(
      resp=>{
    },
    error => this.snackBar=error
    );
  }

  updateFirstName():void{
    this.account.user.firstName=this.accountForm.value.firstName;
    this.userService.updateFirstName(this.account.user).subscribe(
      resp=>{
    },
    error => this.snackBar=error
    );
  }

  updateLastName():void{
    this.account.user.lastName=this.accountForm.value.lastName;
    this.userService.updateLastName(this.account.user).subscribe(
      resp=>{
    },
    error => this.snackBar=error
    );
  }

  updateEmail():void{
    this.account.user.email=this.accountForm.value.email;
    this.userService.updateEmail(this.account.user).subscribe(
      resp=>{
        if(resp==null){
          this.snackBar.open("This email already exists!", "Close",{
            duration:2000
          });
          this.accountForm.patchValue({
            email: ""
          })
        }
    },
    error => this.snackBar=error
    );
  }

  updatePhone():void{
    this.account.user.phone=this.accountForm.value.phone;
    this.userService.updatePhone(this.account.user).subscribe(
      resp=>{
        if(resp==null){
          this.snackBar.open("This phone already exists!", "Close",{
            duration:2000
          });
          this.accountForm.patchValue({
            phone: ""
          })
        }
    },
    error => this.snackBar=error
    );
  }

  updateAge():void{
    this.account.user.age=this.accountForm.value.age;
    this.userService.updateAge(this.account.user).subscribe(
      resp=>{
    },
    error => this.snackBar=error
    );
  }
}
