import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/model/service';
import { ServicesService } from 'src/app/service/services.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  services:Service[];
  constructor(private servicesService:ServicesService,private router:Router) {
   }

  ngOnInit(): void {
    this.servicesService.getAllServices().subscribe(data => {
      this.services = data;
    },
    error => {
      console.log(error);
      this.services=[];
     } );
  }
  goToAddService():void{
    this.router.navigate(["admin/services/add"]);
  }

  updateName(updatedService:Service):void{
    this.servicesService.updateName(updatedService).subscribe(
  
      response => {
      },
      error => console.log(error)
    );
  }

  updatePrice(updatedService:Service):void{
    this.servicesService.updatePrice(updatedService).subscribe(
  
      response => {
      },
      error => console.log(error)
    );
  }

  updateDuration(updatedService:Service):void{
    this.servicesService.updateDuration(updatedService).subscribe(
      response => {
      },
      error => console.log(error)
    );
  }

  deleteService(service:Service,index:number):void{
    this.servicesService.deleteService(service.id).subscribe(
  
      response => {
        this.services.splice(index,1)
      },
      error => console.log(error)
    );
  }

}
