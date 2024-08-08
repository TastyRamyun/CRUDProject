import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  newUser: User = this.userService.getEmptyUser();
  users$: Observable<User[]>
  user: User = this.userService.getCurrUser();
  isEditing: boolean = false;

  constructor(public router: Router,private userService: UserService){
    this.users$ = this.userService.getUsers();
  }

  updateUser(form: NgForm){
    this.isEmailTaken(this.newUser.email).subscribe(emailTaken => {
      if (form.valid && !emailTaken) {
        const updatedUserCopy = { ...this.user };
        this.userService.updateUser(updatedUserCopy).subscribe(
          () => {
            console.log('User updated successfully');
            this.newUser = this.userService.getEmptyUser();
            this.isEditing = false;
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

  isEmailTaken(email: string): Observable<boolean> {
    return this.users$.pipe(
      map(users => users.some(user => user.email === email))
    );
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
  
  logout(){
    this.router.navigate(['/login']);
    this.userService.setCurrUser('');
  }

}
