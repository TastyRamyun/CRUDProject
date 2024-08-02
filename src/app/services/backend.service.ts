import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { FetchService } from './fetch.service';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private usersUrl = 'http://localhost:3000/users';
  private rolesUrl = 'http://localhost:3000/roles';
  private permissionsUrl = 'http://localhost:3000/permissions';

  constructor(private fetchService: FetchService) {}

  getUsers(): Observable<User[]> {
    return this.fetchService.get<User[]>(this.usersUrl)
  }

  getRoles(): Observable<Role[]> {
    return this.fetchService.get<Role[]>(this.rolesUrl)
  }

  getPermissions(): Observable<Permissions[]>{
    return this.fetchService.get<Permissions[]>(this.permissionsUrl)
  }

  getAllData(): Observable<[User[], Role[], Permissions[]]> {
    return forkJoin([
      this.getUsers(),
      this.getRoles(),
      this.getPermissions()
    ]);
  }

  addUser(user: User): Observable<User> {
    console.log(user)
    return this.fetchService.post<User>(this.usersUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.fetchService.put<User>(`${this.usersUrl}/${user.email}`, user);
  }

  deleteUser(user: User): Observable<void> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.fetchService.delete<void>(url);
  }
}
