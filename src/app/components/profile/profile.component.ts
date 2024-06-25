import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../models/user.model';


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

  updateUser(){
    const firstName = document.getElementById('firstName') as HTMLInputElement
    this.user.firstName = firstName.value
    const lastName = document.getElementById('lastName') as HTMLInputElement
    this.user.lastName = lastName.value
    const email = document.getElementById('email') as HTMLInputElement
    this.user.email = email.value
    const password = document.getElementById('password') as HTMLInputElement
    this.user.password = password.value
    const address = document.getElementById('address') as HTMLInputElement
    this.user.address = address.value
    const city = document.getElementById('city') as HTMLInputElement
    this.user.city = city.value
    const phone = document.getElementById('phone') as HTMLInputElement
    this.user.phone = parseInt(phone.value)

    this.userService.updateUser(this.user)
    this.isEditing= false;
  }

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
