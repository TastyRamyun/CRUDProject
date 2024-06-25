import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from './fetch.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'ngCRUDMaster';
  // data: any 
  // constructor(private router: Router,private fetchService: FetchService,private userService:UserService){
  //   this.router.navigate(['/login']);
  //   // this.fetchService.fetchData().subscribe(data => {
  //   //   this.data = data;
  //   //   console.log(this.data);
  //   // });
  // }

  users$: Observable<User[]>;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectAllUsers);
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  addUser(name: string): void {
    const newUser: User = { id: Math.random(), name };
    this.store.dispatch(UserActions.addUser({ user: newUser }));
  }
}
