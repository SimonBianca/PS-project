import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  servicesForm:FormGroup=new FormGroup({});
  constructor(private servicesService:ServicesService,private router:Router,
    private snackBar:MatSnackBar) {
   }

  ngOnInit(): void {
    this.servicesService.getAllServices().subscribe(data => {
      this.services = data;
      var that=this;
      this.services.forEach(function(item){
        that.servicesForm.addControl(item.id.toString(),new FormGroup({
          name:new FormControl(item.name,[Validators.required]),
          price:new FormControl(item.price,[Validators.required,Validators.pattern("[1-9]{1}[0-9]{1,2}$")]),
          duration:new FormControl(item.duration,[Validators.required,,Validators.pattern("[2-9]{1}[0-9]{1,2}$")])
        }));
      });
    },
    error => {
      console.log(error);
      this.services=[];
     } );
  }
  goToAddService():void{
    this.router.navigate(["admin/services/add"]);
  }

  updateName(updatedService:Service,formGroup:FormGroup):void{ 
    updatedService.name=formGroup.controls.name.value;
    if(!formGroup.valid){
      return;
    }
    this.servicesService.updateName(updatedService).subscribe(
      response => {
        if(response==null){
          this.snackBar.open("This service already exists!", "Close",{
            duration:2000
          });
          formGroup.controls.name.setValue("");
        }
      },
      error => this.snackBar=error
    );
  }

  updatePrice(updatedService:Service,formGroup:FormGroup):void{
    updatedService.price=formGroup.controls.price.value;
    if(!formGroup.valid){
      return;
    }
    this.servicesService.updatePrice(updatedService).subscribe(
      response => {
      },
      error => console.log(error)
    );
  }

  updateDuration(updatedService:Service,formGroup:FormGroup):void{
    updatedService.duration=formGroup.controls.duration.value;
    if(!formGroup.valid){
      return;
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

  getFormGroup(id:number){
    return (this.servicesForm.controls[id.toString()] as FormGroup);
  }

  getNameFormControl(id:number){
    return this.getFormGroup(id).controls.name as FormControl;
  }

  getPriceFormControl(id:number){
    return this.getFormGroup(id).controls.price as FormControl;
  }

  getDurationFormControl(id:number){
    return this.getFormGroup(id).controls.duration as FormControl;
  }

}
