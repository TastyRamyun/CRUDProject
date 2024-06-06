import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  invalidLogin: boolean = false;

  constructor(private router: Router,private userService: UserService){

  }

  onSubmit(email: string, password: string) {
    const user: User | undefined = this.userService.getUserByEmail(email);
    if (user) {
      console.log(user)
      this.invalidLogin = false;
      this.router.navigate(['/dash']);
      this.userService.setCurrUser(email);
    } else {
      console.log('User not found!');
      this.invalidLogin = true;
    }
  }

}
