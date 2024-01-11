import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UpdateemployeeComponent } from './updateemployee/updateemployee.component';
import { UpdateemployeebyadminComponent } from './updateemployeebyadmin/updateemployeebyadmin.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employeelist', component: EmployeelistComponent },
  { path: 'userdashboard/:id', component: UserdashboardComponent },
  { path: 'updateemployee/:id', component: UpdateemployeeComponent },
  { path: 'admindashboard', component: AdmindashboardComponent },
  {
    path: 'updateemployeebyadmin/:id',
    component: UpdateemployeebyadminComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    EmployeelistComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    UpdateemployeeComponent,
    UpdateemployeebyadminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
