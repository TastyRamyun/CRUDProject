import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './states/user.reducer';
import { UserEffects } from './states/user.effects';

@NgModule({ declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        ProfileComponent,
        EmployeesComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
        StoreModule.forRoot({ users: userReducer }),
        EffectsModule.forRoot([UserEffects]),
        BrowserModule,
        AppRoutingModule,
        FormsModule], 
    providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
