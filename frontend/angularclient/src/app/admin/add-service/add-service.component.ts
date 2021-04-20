import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Service } from 'src/app/model/service';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  service:Service;
  serviceForm:FormGroup;

  constructor(private router:Router, private servicesService:ServicesService,
    private formBuilder:FormBuilder, private snackBar:MatSnackBar) {
    this.service=new Service();
   }

  ngOnInit(): void {
    this.serviceForm=this.formBuilder.group({
      name:[null,Validators.required],
      price:[null,[Validators.required,Validators.pattern("[1-9]{1}[0-9]{1}$")]],
      duration:[null,[Validators.required,Validators.pattern("[1-9]{1}[0-9]{1}$")]]
    })
  }

  addService():void{
    if(this.serviceForm.invalid){
      this.snackBar.open("Please fill in the form!", "Close",{
        duration:2000
      });
      return;
    }
    this.service.name=this.serviceForm.value.name;
    this.service.price=this.serviceForm.value.price;
    this.service.duration=this.serviceForm.value.duration;
    this.servicesService.addService(this.service).subscribe(
    data => {
      if(data!=null){
        this.service = data;
        this.router.navigate(["admin/services"]);
      }
      if(data==null){
        this.snackBar.open("This service already exists!", "Close",{
          duration:2000
        });
      }
    },
    error =>this.snackBar=error
    );
  }

}
