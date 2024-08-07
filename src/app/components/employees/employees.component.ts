import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent{
  id: number = 0;
  users$: Observable<User[]>
  creatingUser: boolean = false;
  editingUser: boolean = false;
  newUser: User = this.getEmptyUser();
  user: User = this.userService.getCurrUser()
  
  constructor(private userService: UserService,private router: Router){
    this.users$ = this.userService.getUsers();
  }

  saveUser(form: NgForm){
    this.isEmailTaken(this.newUser.email).subscribe(emailTaken => {
      if (form.valid && !emailTaken) {
        const newUserCopy = { ...this.newUser };
        this.userService.addUser(newUserCopy).subscribe(
          () => {
            console.log('User added successfully');
            this.newUser = this.getEmptyUser();
            this.users$.subscribe(users => {
              console.log('Current list of users:', users);
            });
            this.creatingUser = false;
          },
          (error) => {
            console.error('Error adding user:', error);
          }
        )
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
        this.userService.updateUser(updatedUserCopy).subscribe(
          () => {
            console.log('User updated successfully');
            this.newUser = this.getEmptyUser();
            this.editingUser = false;
            this.user = this.userService.getCurrUser();
            this.users$ = this.userService.getUsers();
            this.users$.subscribe(users => {
              console.log('Current list of users:', users);
            });
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        )
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
    const currUser = this.userService.getCurrUser()
    if(currUser.email !== user.email){
      if (window.confirm('Are you sure you want to delete this user?')) {
        this.userService.deleteUser(user).subscribe(
          () => {
            console.log('User deleted successfully');
            this.users$ = this.userService.getUsers()
          },
          (error) => {
            console.error('Error deleting user:', error);
          }
        )
      }
    }else{
      alert("You cannot delete yourself.")
    }
  }

  getEmptyUser(): User {
    this.id = Date.now()
    return {
      id: this.id.toString(),
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

  isEmailTaken(email: string): Observable<boolean> {
    return this.users$.pipe(
      map(users => users.some(user => user.email === email))
    );
  }
}
