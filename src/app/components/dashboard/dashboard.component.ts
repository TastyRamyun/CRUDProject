import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  user: User = this.userService.getCurrUser(); //Not sure if Im supposed to be adding undefined to all of these.
  constructor(private router: Router, private userService: UserService){
  }

  logout(){
    this.router.navigate(['/login']);
    this.userService.setCurrUser('');
  }

  toProfile(){
    this.router.navigate(['/profile']);
  }

  toEmployees(){
    this.router.navigate(['/employees']);
  }

  
  

}
