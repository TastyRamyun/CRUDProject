import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private router: Router,private userService: UserService){
  }
  user: User = this.userService.getCurrUser();
  isEditing: boolean = false;

  toDashboard() {
    this.router.navigate(['/dash'])
  }

  editProfile(){
    this.isEditing = true;
  }

  exitEdit(){
    this.isEditing = false;
  }

}
