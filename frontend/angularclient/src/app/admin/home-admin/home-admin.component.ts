import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  constructor( private router:Router) { }

  ngOnInit(): void {
  }

  goToAccountList():void{
    this.router.navigate(["admin/accounts"]);
  }

  goToServiceList():void{
    this.router.navigate(["admin/services"]);
  }

  goToAccountDetails():void{
    this.router.navigate(["admin/details"]);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    this.router.navigate(["login"]);
  }

}
