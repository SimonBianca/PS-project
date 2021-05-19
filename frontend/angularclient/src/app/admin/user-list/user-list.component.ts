import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public accounts:Account[];
  displayedColumns: string[] = ['username','firstName','lastName','email','phone','age','role'];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.findAllAccounts().subscribe(data => {
      this.accounts = data;
    },
    error => {
      console.log(error);
      this.accounts=[];
     } );
  }
}
