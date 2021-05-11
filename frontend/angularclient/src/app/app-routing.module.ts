import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddServiceComponent } from './admin/add-service/add-service.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { HomeClientComponent } from './client/home-client/home-client.component';
import { ServiceListComponent } from './admin/service-list/service-list.component';
import { AuthGuard } from './guard/auth-guard.service';
import { LoginComponent } from './user/login/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ListOfServicesComponent } from './client/list-of-services/list-of-services.component';
import { AccountDetailsComponent } from './common/account-details/account-details.component';
import { AddAppointmentComponent } from './client/add-appointment/add-appointment.component';
import { OldAppointmentsComponent } from './client/old-appointments/old-appointments.component';
import { FutureAppointmentsComponent } from './client/future-appointments/future-appointments.component';
import { OldAppointmetsListComponent } from './admin/old-appointmets-list/old-appointmets-list.component';
import { FutureAppointmetsListComponent } from './admin/future-appointmets-list/future-appointmets-list.component';
import { OnWaitingAppointmentsComponent } from './admin/on-waiting-appointments/on-waiting-appointments.component';
import { OnWaitingAppointmentsListComponent } from './client/on-waiting-appointments-list/on-waiting-appointments-list.component';

const routes: Routes = [
  {path: '', redirectTo:'/login',pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'client', component:HomeClientComponent, canActivate: [AuthGuard]},
  {path: 'admin', component:HomeAdminComponent, canActivate: [AuthGuard]},
  {path:'admin/accounts',component:UserListComponent, canActivate: [AuthGuard]},
  {path:'admin/services',component:ServiceListComponent, canActivate: [AuthGuard]},
  {path:'admin/services/add',component:AddServiceComponent, canActivate: [AuthGuard]},
  {path:'client/services',component:ListOfServicesComponent,canActivate:[AuthGuard]},
  {path:'client/details',component:AccountDetailsComponent,canActivate:[AuthGuard]},
  {path:'admin/details',component:AccountDetailsComponent,canActivate:[AuthGuard]},
  {path:'client/appointment',component:AddAppointmentComponent,canActivate:[AuthGuard]},
  {path:'client/old-appointments',component:OldAppointmentsComponent,canActivate:[AuthGuard]},
  {path:'client/future-appointments',component:FutureAppointmentsComponent,canActivate:[AuthGuard]},
  {path:'admin/old-appointments',component:OldAppointmetsListComponent,canActivate:[AuthGuard]},
  {path:'admin/future-appointments',component:FutureAppointmetsListComponent,canActivate:[AuthGuard]},
  {path:'admin/on-waiting-appointments',component:OnWaitingAppointmentsComponent,canActivate:[AuthGuard]},
  {path:'client/on-waiting-appointments',component:OnWaitingAppointmentsListComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
