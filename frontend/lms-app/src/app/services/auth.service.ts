import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, IUserAuthRes } from '../data.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  snackBar = inject(MatSnackBar);
  baseURL = 'http://localhost:5000/api/auth';
  private isAuthenticated = false;
  private user: string | null = null;
  private userSubject = new BehaviorSubject<string | null>(null);
  userObs$ = this.userSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('accessToken')) {
      this.getCurrentUser();
    }
  }

  getCurrentUser() {
    const accessToken = localStorage.getItem('accessToken');
    this.http
      .post<any>(`${this.baseURL}/current`, {
        accessToken: accessToken,
      })
      .subscribe(
        (user) => {
          this.user = user.username;
          this.isAuthenticated = true;
          this.userSubject.next(this.user);
          this.router.navigate(['/course']);
          this.snackBar.open('Logged in successfully!', 'Ok', {
            duration: 3000,
          });
        },
        (error) => {
          localStorage.removeItem('accessToken');
          this.snackBar.open(error.error.title, 'Ok', {
            duration: 3000,
          });
        }
      );
  }

  registerUser(user: IUser): any {
    this.http.post<IUser>(`${this.baseURL}/register`, user).subscribe(
      (data) => {
        this.router.navigate(['auth/login']);
        this.snackBar.open('Registered successfully!', 'Ok', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000,
        });
      }
    );
  }
  loginUser(user: IUser): void {
    this.http.post<any>(`${this.baseURL}/login`, user).subscribe(
      (data: IUserAuthRes) => {
        this.user = data.username;
        localStorage.setItem('accessToken', data.accessToken);
        //set cookie
        this.isAuthenticated = true;
        this.userSubject.next(this.user);
        this.router.navigate(['/course']);
        this.snackBar.open('Logged in successfully!', 'Ok', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open(error.error.message, 'Ok', {
          duration: 3000,
        });
      }
    );
  }
  logOutUser() {
    //should inform server
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.user = null;
    this.userSubject.next(null);
    this.router.navigate(['auth/login']);
    this.snackBar.open('Logged out!', 'Ok', {
      duration: 3000,
    });
  }

  public getToken(): string | null {
    const userToken = localStorage.getItem('accessToken');
    return userToken;
  }
  public isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
  public getUser(): string | null {
    return this.user;
  }
}
