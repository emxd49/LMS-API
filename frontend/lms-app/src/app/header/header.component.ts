import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}
  title = 'LMS-APP';
  user: string | null = null;
  tabs = [
    { displayName: 'Courses', route: 'course/courses' },
    { displayName: 'Enrolled Courses', route: 'course/enrolled-courses' },
  ];
  activeLink = this.tabs[0].displayName;
  ngOnInit() {
    this.authService.userObs$.subscribe((user) => {
      this.user = user;
    });
  }
  logout() {
    this.authService.logOutUser()
  }
}
