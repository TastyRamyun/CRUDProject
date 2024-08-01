import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Observable, Subscription, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Role } from './models/role.model';
import { Permission } from './models/permissions.model';

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
      role: 0, 
      permissions: [], 
      address: '', 
      city: '', 
      phone: 0, 
      DOB: ''
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  private usersUrl = '/assets/data/users.json';
  private rolesUrl = '/assets/data/roles.json';
  private permissionsUrl = '/assets/data/permissions.json';

  constructor(private http: HttpClient) { 
    this.users.push({
      firstName: 'Enrique', 
      lastName: 'Perez', 
      email: 'ep17@me.com',
      password:'pass', 
      role: 1, 
      permissions: ['Admin'], 
      address: '25214 Clover Ranch Dr.', 
      city: 'Katy', 
      phone: 8323125753, 
      DOB: '01/01/1999'})
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.rolesUrl);
  }

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.permissionsUrl);
  }

  // Example method to check if an email already exists
  emailExists(email: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => users.some(user => user.email === email))
    );
  }

  // Example delete method
  deleteUserRXJS(email: string): Observable<User[]> {
    return this.getUsers().pipe(
      map(users => users.filter(user => user.email !== email))
    );
  }



  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
      role: 0, 
      permissions: [], 
      address: '', 
      city: '', 
      phone: 0, 
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
