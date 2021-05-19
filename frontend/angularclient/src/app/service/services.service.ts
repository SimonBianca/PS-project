import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../model/service';
import { userRoleEnum } from '../model/userRole.enum';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseURLAdmin="http://localhost:8080/admin";
  private baseURLClient="http://localhost:8080/client";

  services:Service[];

  constructor(private http:HttpClient,private userService:UserService) { }

  public getAllServices(): Observable<Service[]>{
    if(localStorage.getItem('role')==userRoleEnum.Admin){
      return this.http.get<Service[]>(`${this.baseURLAdmin}/services`);
    }
    else{
      return this.http.get<Service[]>(`${this.baseURLClient}/services`);
    }
  }
  
  addService(service:Service):Observable<Service>{
    return this.http.post<Service>(`${this.baseURLAdmin}/services/add`,service);
  }

  updateName(service:Service):Observable<Service>{
    return this.http.put<Service>(`${this.baseURLAdmin}/services/name`,service)
  }

  updatePrice(service:Service):Observable<Service>{
    return this.http.put<Service>(`${this.baseURLAdmin}/services/price`,service)
  }

  updateDuration(service:Service):Observable<Service>{
    return this.http.put<Service>(`${this.baseURLAdmin}/services/duration`,service)
  }

  deleteService(id:number):Observable<Object>{
    return this.http.delete(`${this.baseURLAdmin}/services/delete/`+id);
  }

  getServiceByName(services:Service[],name:string):Service{
    var selectedItem=null;
    services.forEach(function(item){
      if(item.name==name){
        selectedItem=item;
      }
    });
    return selectedItem;
  }

  getNumberOfServicesByName(services:Service[],name:string):number{
    var nr=0;
    services.forEach(function(item){
      if(item.name==name){
        nr=nr+1;
      }
    });
    return nr;
  }

}

