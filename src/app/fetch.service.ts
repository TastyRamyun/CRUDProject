import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  //not sure if this was how im supposed to handle the backend.
  // fetchData(): Observable<any> {
  //   return this.http.get<any>('assets/admin.json');
  // }
}
