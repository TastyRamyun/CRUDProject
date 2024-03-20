import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngCRUDMaster';

  constructor(private router: Router){}

  goToDash(){
    console.log("Button clicked");
    this.router.navigate(['/dash']);
  }
}
