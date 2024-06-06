import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from './fetch.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngCRUDMaster';
  data: any 
  constructor(private router: Router,private fetchService: FetchService,private userService:UserService){
    this.router.navigate(['/login']);
    // this.fetchService.fetchData().subscribe(data => {
    //   this.data = data;
    //   console.log(this.data);
    // });
  }
}
