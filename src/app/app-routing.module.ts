import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployeesComponent } from './components/employees/employees.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dash', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'employees', component: EmployeesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
