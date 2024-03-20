import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = ""
  password: string = ""
  constructor(private router: Router){}

  authenticate( email: string,password: string){
    this.email = email
    this.password = password
    this.router.navigate(['/dash']);
  }

}
