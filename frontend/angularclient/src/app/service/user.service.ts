import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Account } from '../model/account';
import { userRoleEnum } from '../model/userRole.enum';
import { User } from '../model/user';
import { Appointment } from '../model/appointment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL="http://localhost:8080";
  private baseURLClient="http://localhost:8080/client";
  private baseURLAdmin="http://localhost:8080/admin";

  public account: Account;
  public user:User;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Account>{
    const account:Account=new Account();
    account.username=username;
    account.password=password;
    return this.http.post<Account>(`${this.baseURL}/login`,account);
  }

  register(account: Account):Observable<Account>{
    return this.http.post<Account>(`${this.baseURL}/register`,account);
  }

  findAllAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>(`${this.baseURLAdmin}/accounts`);
  }

  getAccountById(id: string): Observable<Account>{
    let params=new HttpParams().set('id',id);
    if(localStorage.getItem('role')==userRoleEnum.Client){
      return this.http.get<Account>(`${this.baseURLClient}/details`,{params:params})
    }
    else{
      return this.http.get<Account>(`${this.baseURLAdmin}/details`,{params:params})
    }
  }

  updateUsername(account:Account):Observable<Account>{
    if(localStorage.getItem('role')==userRoleEnum.Admin){
      return this.http.put<Account>(`${this.baseURLAdmin}/details/username`,account)
    }
    else{
      return this.http.put<Account>(`${this.baseURLClient}/details/username`,account)
    }
  }

  updatePassword(account:Account):Observable<Account>{
    if(localStorage.getItem('role')==userRoleEnum.Admin){
      return this.http.put<Account>(`${this.baseURLAdmin}/details/password`,account)
    }
    else{
      return this.http.put<Account>(`${this.baseURLClient}/details/password`,account)
    }
  }
  updateFirstName(user:User):Observable<User>{
    if(localStorage.getItem('role')==userRoleEnum.Admin){
      return this.http.put<User>(`${this.baseURLAdmin}/details/firstName`,user)
    }
    else{
      return this.http.put<User>(`${this.baseURLClient}/details/firstName`,user)
    }
  }

  updateLastName(user:User):Observable<User>{
    if(localStorage.getItem('role')==userRoleEnum.Admin){
      return this.http.put<User>(`${this.baseURLAdmin}/details/lastName`,user)
    }
    else{
      return this.http.put<User>(`${this.baseURLClient}/details/lastName`,user)
    }
  }

  updateEmail(user:User):Observable<User>{
    if(localStorage.getItem('role')==userRoleEnum.Admin){
      return this.http.put<User>(`${this.baseURLAdmin}/details/email`,user)
    }
    else{
      return this.http.put<User>(`${this.baseURLClient}/details/email`,user)
    }
  }

  updatePhone(user:User):Observable<User>{
    if(localStorage.getItem('role')==userRoleEnum.Admin){
      return this.http.put<User>(`${this.baseURLAdmin}/details/phone`,user)
    }
    else{
      return this.http.put<User>(`${this.baseURLClient}/details/phone`,user)
    }
  }

  updateAge(user:User):Observable<User>{
    if(localStorage.getItem('role')==userRoleEnum.Admin){
      return this.http.put<User>(`${this.baseURLAdmin}/details/age`,user)
    }
    else{
      return this.http.put<User>(`${this.baseURLClient}/details/age`,user)
    }
  }

  addAppointment(appointment:Appointment):Observable<Appointment>{
    return this.http.post<Appointment>(`${this.baseURLClient}/appointment`,appointment);
  }

  getOldAppointments(id:string):Observable<Appointment[]>{
    let params=new HttpParams().set('id',id).set('status',"ACCEPTED");
    if(localStorage.getItem('role')==userRoleEnum.Admin){
      return this.http.get<Appointment[]>(`${this.baseURLAdmin}/old-appointments`);
    }
    else{
      return this.http.get<Appointment[]>(`${this.baseURLClient}/old-appointments`,{params:params});
    }
  }

  getFutureAppointments(id:string):Observable<Appointment[]>{
    let params=new HttpParams().set('id',id).set('status',"ACCEPTED");
    if(localStorage.getItem('role')==userRoleEnum.Admin){
      return this.http.get<Appointment[]>(`${this.baseURLAdmin}/future-appointments`);
    }
    else{
      return this.http.get<Appointment[]>(`${this.baseURLClient}/future-appointments`,{params:params});
    }
  }

  refuseAppointment(appointment:Appointment):Observable<Appointment>{
    if(localStorage.getItem('role')==userRoleEnum.Admin){
      return this.http.put<Appointment>(`${this.baseURLAdmin}/on-waiting-appointments/refuse`,appointment);
    }
    else{
      return this.http.put<Appointment>(`${this.baseURLClient}/on-waiting-appointments/refuse`,appointment);
    }
  }

  acceptAppointment(appointment:Appointment):Observable<Appointment>{
    if(localStorage.getItem('role')==userRoleEnum.Admin){
      return this.http.put<Appointment>(`${this.baseURLAdmin}/on-waiting-appointments/accept`,appointment);
    }
    else{
      return this.http.put<Appointment>(`${this.baseURLClient}/on-waiting-appointments/accept`,appointment);
    }
  }

  getOnWaitingAppointments(id:string):Observable<Appointment[]>{
    let params=new HttpParams().set('id',id).set('status',"WAITING");
    if(localStorage.getItem('role')==userRoleEnum.Admin){
      return this.http.get<Appointment[]>(`${this.baseURLAdmin}/on-waiting-appointments`);
    }
    else{
      return this.http.get<Appointment[]>(`${this.baseURLClient}/on-waiting-appointments`,{params:params});
    }
  }

  getAppointmentAccount(appointment:Appointment):Observable<Account>{
      return this.http.put<Account>(`${this.baseURLAdmin}/appointment/account`,appointment);
  }

  getAppointmentsByClient(username:string):Observable<Appointment[]>{
    return this.http.put<Appointment[]>(`${this.baseURLAdmin}/appointments/client`,username);
  }

  getClientAccount(username:string):Observable<Account>{
    return this.http.put<Account>(`${this.baseURLAdmin}/client-account`,username);
  }

  getAppointmentsByDate(date:Date):Observable<Appointment[]>{
    return this.http.put<Appointment[]>(`${this.baseURLAdmin}/appointments/date`,date);
  }

  getAppointmentsByDates(startDate:Date,endDate:Date):Observable<Appointment[]>{
    return this.http.put<Appointment[]>(`${this.baseURLAdmin}/appointments/between-dates`,{startDate:startDate,endDate:endDate});
  }

  exportOldAppointments(id:string){
    let params=new HttpParams().set('id',id);
    return this.http.get(`${this.baseURLClient}/export-appointments`,{params:params, responseType:'text'})
  }

  
  


}

