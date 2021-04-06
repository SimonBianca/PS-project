import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularclient';
  
  constructor(private route:Router){}

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.route.navigate(["login"]);
  }

  get isUserLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
