import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.css']
})
export class HomeClientComponent implements OnInit {
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {

  }

  goToServiceList():void{
    this.router.navigate(["client/services"]);
  }

  goToAccountDetails():void{
    this.router.navigate(["client/details"]);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    this.router.navigate(["login"]);
  }

}
