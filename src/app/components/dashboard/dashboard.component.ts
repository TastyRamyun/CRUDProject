import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  user: User = this.userService.getCurrUser()
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
