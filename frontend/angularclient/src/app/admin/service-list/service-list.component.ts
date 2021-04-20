import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Service } from 'src/app/model/service';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  services:Service[];
  constructor(private servicesService:ServicesService,private router:Router,
    private snackBar:MatSnackBar) {
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
    if(this.servicesService.getNumberOfServicesByName(this.services,updatedService.name)>=2){
      this.snackBar.open("This service already exists!", "Close");
      updatedService.name="";
    }
    this.servicesService.updateName(updatedService).subscribe(
  
      response => {
      },
      error => console.log(error)
    );
  }

  updatePrice(updatedService:Service):void{
    if(_isNumberValue(updatedService.price)){
      if(updatedService.price<10 || updatedService.price >300){
        this.snackBar.open("Price must be between 10 and 300!", "Close");
        updatedService.price=0;
      }
    }
    else{
      this.snackBar.open("Price must be a number between 10 and 300!", "Close");
        updatedService.price=0;
    }
    this.servicesService.updatePrice(updatedService).subscribe(
      response => {
        
      },
      error => console.log(error)
    );
  }

  updateDuration(updatedService:Service):void{
    if(_isNumberValue(updatedService.duration)){
      if(updatedService.duration<15 || updatedService.duration >120){
        this.snackBar.open("Duration must be between 15 and 120!", "Close");
        updatedService.duration=0;
      }
    }
    else{
      this.snackBar.open("Duration must be a number between 15 and 120!", "Close");
        updatedService.duration=0;
    }
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
