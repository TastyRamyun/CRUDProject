import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { BackendService } from './backend.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  id: number = 0
  users: User[] = [];
  currUser: User = {
      id: this.id.toString(),
      email: '',
      password:'', 
      firstName: '', 
      lastName: '', 
      role: '', 
      permissions: '', 
      address: '', 
      city: '', 
      phone: '', 
      DOB: ''
  };

  constructor(private backendService: BackendService) { 
  }

  getUsers(): Observable<User[]> {
    return this.backendService.getUsers().pipe(
      tap(users => this.users = users), // Cache users
      catchError(error => {
        console.error('Error fetching users:', error);
        return of([]); // Return an empty array on error
      })
    )
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.email === email))
    );
  }

  setCurrUser(email: string): void {
    const user = this.users.find(user => user.email === email);

    if (user) {
      this.currUser = user;
    } else {
      this.id = Date.now()
      this.currUser = {
        id: this.id.toString() ,
        email: '',
        password: '', 
        firstName: '', 
        lastName: '', 
        role: '', 
        permissions:'', 
        address: '', 
        city: '', 
        phone: '', 
        DOB: ''
      };
    }
  }

  getCurrUser(): User{
    return this.currUser
  }

  updateUser(updatedUser: User) {
    return this.backendService.updateUser(updatedUser)
  }

  deleteUser(user: User) {
    return this.backendService.deleteUser(user);
  }

  addUser(user: User) {
    return this.backendService.addUser(user)
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
      phone: '',
      DOB: ''
    };
  }
}
