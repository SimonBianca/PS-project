import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/service';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-list-of-services',
  templateUrl: './list-of-services.component.html',
  styleUrls: ['./list-of-services.component.css']
})
export class ListOfServicesComponent implements OnInit {
  services:Service[];
  displayedColumns: string[] = ['name','price','duration'];
  constructor(private servicesService:ServicesService) {
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

}
