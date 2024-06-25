import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private currUser: User = {
      id: -1, 
      email: '',
      password:'', 
      firstName: '', 
      lastName: '', 
      role: '', 
      permissions: '', 
      address: '', 
      city: '', 
      phone: -1, 
      DOB: ''
  };

  constructor(private http: HttpClient, private router: Router) { 
    this.users.push(this.currUser);
    this.users.push({
      id: 0, 
      email: 'ep17@me.com',
      password:'pass', 
      firstName: 'Enrique', 
      lastName: 'Perez', 
      role: 'CEO', 
      permissions: 'Admin', 
      address: '25214 Clover Ranch Dr.', 
      city: 'Katy', 
      phone: 8323125753, 
      DOB: '01/01/1999'})
  }

  //"$" To mark a method returning an observable
  getUsers$(): Observable<User[]> {
    return of(this.users);
  }

  // Get user by email
  getUserByEmail(email: string): User | undefined{
    const user = this.users.find(user => user.email === email);
    return user ? user : undefined;
  }

  // Get user by Id
  getUserById(id: number): User | undefined{
    const user = this.users.find(user => user.id === id)
    return user? user : undefined
  }

  // Sets the current user
  setCurrUser(email: string): void {
    const user = this.users.find(user => user.email === email);
    user? this.currUser = user : this.currUser = {
      id: -1, 
      email: '',
      password:'', 
      firstName: '', 
      lastName: '', 
      role: '', 
      permissions: '', 
      address: '', 
      city: '', 
      phone: -1, 
      DOB: ''
    };
  }

  getCurrUser(): User{
    return this.currUser
  }

  // Update user
  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      console.log(this.users)
    }
  }

  // Delete user
  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }

  // New User
  newUser(newUser: User): void {
    this.users.push(newUser);
  }

  numberUsers(): number{
    return this.users.length
  }

}
