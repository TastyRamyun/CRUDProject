import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent{
  users$ = this.userService.getUsers$();
  creatingUser: boolean = false;
  newUser: User = {
    id: -1,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
    permissions: ''
  }
  
  constructor(private userService: UserService,private router: Router){
  }

  saveUser(){
    const id = this.userService.numberUsers()
    console.log(id)
    this.newUser.id = id - 1
    const firstName = document.getElementById('firstName') as HTMLInputElement
    this.newUser.firstName = firstName.value
    const lastName = document.getElementById('lastName') as HTMLInputElement
    this.newUser.lastName = lastName.value
    const email = document.getElementById('email') as HTMLInputElement
    this.newUser.email = email.value
    const password = document.getElementById('password') as HTMLInputElement
    this.newUser.password = password.value
    const role = document.getElementById('role') as HTMLInputElement
    this.newUser.role = role.value
    const permissions = document.getElementById('permissions') as HTMLInputElement
    this.newUser.permissions = permissions.value
    const address = document.getElementById('address') as HTMLInputElement
    this.newUser.address = address.value
    const city = document.getElementById('city') as HTMLInputElement
    this.newUser.city = city.value
    const phone = document.getElementById('phone') as HTMLInputElement
    this.newUser.phone = parseInt(phone.value)
    const DOB = document.getElementById('DOB') as HTMLInputElement
    this.newUser.DOB = DOB.value

    this.userService.newUser(this.newUser)
    this.resetNewUser();
    this.creatingUser = false;
    console.log(this.users$)
  }

  resetNewUser(){
    this.newUser.id = -1
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
    this.creatingUser = true;
  }

  cancelNewUser(){
    this.creatingUser = false;
  }
}
