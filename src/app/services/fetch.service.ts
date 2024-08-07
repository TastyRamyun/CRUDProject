import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  // The fetch service serves as a place where all http requests will go through
  // "<T>" means that T can be any type (e.g., User, Role, Permission, etc.).
  
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, data: any): Observable<T> {
    console.log(`Adding User: ${url} , ${data}`)
    return this.http.post<T>(url, data, { headers: this.headers });
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data, { headers: this.headers });
  }

  delete<T>(url: string): Observable<T> {
    console.log(`Deleting from URL: ${url}`)
    return this.http.delete<T>(url, { headers: this.headers });
  }
}
