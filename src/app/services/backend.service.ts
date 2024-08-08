import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { FetchService } from './fetch.service';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { Announcement } from '../models/announcements.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private usersUrl = 'http://localhost:3000/users';
  private rolesUrl = 'http://localhost:3000/roles';
  private permissionsUrl = 'http://localhost:3000/permissions';
  private annUrl = 'http://localhost:3000/announcements'

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

  getAnn(): Observable<Announcement[]>{
    return this.fetchService.get<Announcement[]>(this.annUrl)
  }

  getAllData(): Observable<[User[], Role[], Permissions[],Announcement[]]> {
    return forkJoin([
      this.getUsers(),
      this.getRoles(),
      this.getPermissions(),
      this.getAnn()
    ]);
  }

  addAnn(ann: Announcement): Observable<Announcement>{
    return this.fetchService.post<Announcement>(this.annUrl, ann)
  }
  
  deleteAnn(ann: Announcement): Observable<void>{
    const url = `${this.annUrl}/${ann.id}`;
    return this.fetchService.delete<void>(url);
  }

  addUser(user: User): Observable<User> {
    return this.fetchService.post<User>(this.usersUrl, user);
  }

  deleteUser(user: User): Observable<void> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.fetchService.delete<void>(url);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.fetchService.put<User>(url, user);
  }
}
