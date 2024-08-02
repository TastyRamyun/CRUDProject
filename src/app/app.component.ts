import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from './services/fetch.service';
import { UserService } from './services/user.service';
import { BackendService } from './services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngCRUDMaster';
  data: any 
  constructor(private router: Router,private backendService: BackendService){
    this.router.navigate(['/login']);
    this.backendService.getAllData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }
}
