import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, map, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { BackendService } from './backend.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private currUser: User = {
      id: 0,
      email: '',
      password:'', 
      firstName: '', 
      lastName: '', 
      role: 0, 
      permissions: [], 
      address: '', 
      city: '', 
      phone: 0, 
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
      this.currUser = {
        id:0,
        email: '',
        password: '', 
        firstName: '', 
        lastName: '', 
        role: 0, 
        permissions: [], 
        address: '', 
        city: '', 
        phone: 0, 
        DOB: ''
      };
    }
  }

  getCurrUser(): User{
    return this.currUser
  }

  // Update user
  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user === updatedUser);
    if (index !== -1) {
      this.users[index] = updatedUser;
      console.log(this.users)
    }
  }

  // Delete user
  deleteUser(user: User) {
    return this.backendService.deleteUser(user);
  }

  // New User
  addUser(user: User): Observable<User> {
    return this.backendService.addUser(user)
  }

  numberUsers(): number{
    this.getUsers();
    return this.users.length
  }

}
