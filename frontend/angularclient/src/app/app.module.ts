import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login/login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './user/register/register.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { HomeClientComponent } from './client/home-client/home-client.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { ServiceListComponent } from './admin/service-list/service-list.component';
import { AddServiceComponent } from './admin/add-service/add-service.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {  MatButtonModule } from '@angular/material/button';
import { ListOfServicesComponent } from './client/list-of-services/list-of-services.component';
import { AccountDetailsComponent } from './common/account-details/account-details.component';
import { AddAppointmentComponent } from './client/add-appointment/add-appointment.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { AppHeaderComponent } from './common/app-header/app-header.component';
import {MatTableModule} from '@angular/material/table';
import { OldAppointmentsComponent } from './client/old-appointments/old-appointments.component';
import { FutureAppointmentsComponent } from './client/future-appointments/future-appointments.component';
import { OldAppointmetsListComponent } from './admin/old-appointmets-list/old-appointmets-list.component';
import { FutureAppointmetsListComponent } from './admin/future-appointmets-list/future-appointmets-list.component';
import { OnWaitingAppointmentsComponent } from './admin/on-waiting-appointments/on-waiting-appointments.component';
import { OnWaitingAppointmentsListComponent } from './client/on-waiting-appointments-list/on-waiting-appointments-list.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeAdminComponent,
    HomeClientComponent,
    UserListComponent,
    ServiceListComponent,
    AddServiceComponent,
    ListOfServicesComponent,
    AccountDetailsComponent,
    AddAppointmentComponent,
    AppHeaderComponent,
    OldAppointmentsComponent,
    FutureAppointmentsComponent,
    OldAppointmetsListComponent,
    FutureAppointmetsListComponent,
    OnWaitingAppointmentsComponent,
    OnWaitingAppointmentsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
