import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  invalidLogin: boolean = false;
  users$: Observable<User[]>

  constructor(private router: Router,private userService: UserService){
    this.users$ = this.userService.getUsers();
  }

  onSubmit(email: string, password: string) {
    this.userService.getUserByEmail(email).subscribe(user => {
      if (user && password) {
        this.invalidLogin = false;
        this.userService.setCurrUser(email);
        this.router.navigate(['/dash']);
      } else {
        console.log('Invalid email or password!');
        this.invalidLogin = true;
      }
    });
  }

}
