import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Observable, Subscription, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private currUser: User = {
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

  constructor() { 
    this.users.push({
      firstName: 'Enrique', 
      lastName: 'Perez', 
      email: 'ep17@me.com',
      password:'pass', 
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

  // Sets the current user
  setCurrUser(email: string): void {
    const user = this.users.find(user => user.email === email);
    user? this.currUser = user : this.currUser = {
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
    const index = this.users.findIndex(user => user === updatedUser);
    if (index !== -1) {
      this.users[index] = updatedUser;
      console.log(this.users)
    }
  }

  // Delete user
  deleteUser(userToBeDeleted: User): void {
    this.users = this.users.filter(user => user.email !== userToBeDeleted.email);
    console.log(this.users)
    this.getUsers$();
  }

  // New User
  newUser(newUser: User): void {
    this.users.push(newUser);
  }

  numberUsers(): number{
    this.getUsers$();
    return this.users.length
  }

}
