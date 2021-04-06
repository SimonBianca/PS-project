import { Component, OnInit } from '@angular/core';
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
  constructor(private userService:UserService) { 
  }
  ngOnInit(): void {
    this.userService.getAccountById(localStorage.getItem('id')).subscribe(res => {
      this.account = res;
    },
    error => {
      console.log(error);
      this.account=null;
     } );
  }

  updateUsername(updatedAccount:Account):void{
    this.userService.updateUsername(updatedAccount).subscribe(
      resp=>{
    },
    error=>console.log(error)
    );
  }

  updatePassword(updatedAccount:Account):void{
    this.userService.updatePassword(updatedAccount).subscribe(
      resp=>{
    },
    error=>console.log(error)
    );
  }

  updateFirstName(updatedAccount:User):void{
    this.userService.updateFirstName(updatedAccount).subscribe(
      resp=>{
    },
    error=>console.log(error)
    );
  }

  updateLastName(updatedAccount:User):void{
    this.userService.updateLastName(updatedAccount).subscribe(
      resp=>{
    },
    error=>console.log(error)
    );
  }

  updateEmail(updatedAccount:User):void{
    this.userService.updateEmail(updatedAccount).subscribe(
      resp=>{
    },
    error=>console.log(error)
    );
  }

  updatePhone(updatedAccount:User):void{
    this.userService.updatePhone(updatedAccount).subscribe(
      resp=>{
    },
    error=>console.log(error)
    );
  }

  updateAge(updatedAccount:User):void{
    this.userService.updateAge(updatedAccount).subscribe(
      resp=>{
    },
    error=>console.log(error)
    );
  }
}
