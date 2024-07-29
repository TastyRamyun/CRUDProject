import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../user.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent{
  users$: Observable<User[]>
  creatingUser: boolean = false;
  newUser: User = this.getEmptyUser();
  
  constructor(private userService: UserService,private router: Router){
    this.users$ = this.userService.getUsers$();
  }

  saveUser(form: NgForm){
    if (form.valid) {
      console.log('User data:', this.newUser);
      const newUserCopy = { ...this.newUser };
      this.userService.newUser(newUserCopy)
      this.newUser = this.getEmptyUser();
      this.users$ = this.userService.getUsers$();

      this.creatingUser = false;
      this.users$.subscribe(users => {
        console.log('Current list of users:', users);
      });
    } else {
      console.log('Form is invalid');
      alert('Please fill in all fields labled with an asterisk');
    }
  }

  resetNewUser(){
    this.newUser.id = 0
    this.newUser.firstName = ''
    this.newUser.lastName = ''
    this.newUser.email = ''
    this.newUser.password = ''
    this.newUser.role = ''
    this.newUser.permissions = ''
    this.newUser.phone = 0
    this.newUser.city = ''
    this.newUser.address = ''
    this.newUser.DOB = ''
  }
 
  toDash(){
    this.router.navigate(['/dash']);
  }

  addUser(){
    this.resetNewUser();
    this.creatingUser = true;
  }

  cancelNewUser(){
    this.creatingUser = false;
  }

  getEmptyUser(): User {
    return {
      id: this.userService.numberUsers(),
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
      permissions: '',
      address: '',
      city: '',
      phone: 0,
      DOB: ''
    };
  }
}
