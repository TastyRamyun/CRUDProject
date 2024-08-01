import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../user.service';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent{
  users$: Observable<User[]>
  creatingUser: boolean = false;
  editingUser: boolean = false;
  newUser: User = this.getEmptyUser();
  user: User = this.userService.getCurrUser()
  
  constructor(private userService: UserService,private router: Router){
    this.users$ = this.userService.getUsers$();
  }

  saveUser(form: NgForm){
    this.isEmailTaken(this.newUser.email).subscribe(emailTaken => {
      if (form.valid && !emailTaken) {
        const newUserCopy = { ...this.newUser };
        this.userService.newUser(newUserCopy)
        this.newUser = this.getEmptyUser();
        this.users$ = this.userService.getUsers$();

        this.creatingUser = false;
        this.users$.subscribe(users => {
          console.log('Current list of users:', users);
        });
      } else if(emailTaken){
        console.log('Email is taken!');
        alert('This email is already in use!')
      } else {
        console.log('Form is invalid');
        alert('Please fill in all fields labled with an asterisk');
      }
    })
  }

  toDash(){
    this.router.navigate(['/dash']);
  }

  toNewUser(){
    this.newUser = this.getEmptyUser()
    this.creatingUser = true;
  }

  cancelNewUser(){
    this.creatingUser = false;
  }

  toEditUser(userToEdit: User){
    console.log(userToEdit)
    this.user = userToEdit
    this.editingUser = true;
  }

  saveEdittedUser(form: NgForm) {
    this.isEmailTaken(this.newUser.email).subscribe(emailTaken => {
      if (form.valid && !emailTaken) {
        const updatedUserCopy = { ...this.user };
        this.userService.updateUser(updatedUserCopy)
        this.user = this.userService.getCurrUser();
        console.log("Current user: " + this.user)
        this.users$ = this.userService.getUsers$();

        this.editingUser = false;
        this.users$.subscribe(users => {
          console.log('Current list of users:', users);
        });
      } else if(emailTaken){
        console.log('Email is taken!');
        alert('This email is already in use!')
      } else {
        console.log('Form is invalid');
        alert('Please fill in all fields labled with an asterisk');
      }
    })
  }

  cancelEdit(){
    this.user = this.userService.getCurrUser();
    this.editingUser = false;
  }

  deleteUser(user: User){
    if(this.userService.getCurrUser() !== user){
      if (window.confirm('Are you sure you want to delete this user?')) {
        this.userService.deleteUser(user);
        this.users$ = this.userService.getUsers$()
      }
    }else{
      alert("You cannot delete yourself.")
    }
  }

  getEmptyUser(): User {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 0,
      permissions: [],
      address: '',
      city: '',
      phone: 0,
      DOB: ''
    };
  }

  isEmailTaken(email: string): Observable<boolean> {
    return this.users$.pipe(
      map(users => users.some(user => user.email === email))
    );
  }
}
