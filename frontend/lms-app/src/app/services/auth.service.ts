import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'http://localhost:5000/api/auth';
  private isAuthenticated;
  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = false;
  }
  registerAdmin(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseURL}/register`, user);
  }
  loginAdmin(user: IUser): void {
    this.http.post<any>(`${this.baseURL}/login`, user).subscribe((data) => {
      localStorage.setItem('accessToken', data.accessToken);
      //set cookie
      this.isAuthenticated = true;
      this.router.navigate(['courses']);
    });
  }
  logOutAdmin() {
    //should inform server
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.router.navigate(['admin/login']);
  }
  public isAuthenticatedAdmin(): boolean {
    // return localStorage.getItem("accessToken") ? true : false
    return this.isAuthenticated;
  }
}
