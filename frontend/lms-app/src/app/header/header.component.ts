import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}
  title = 'LMS-APP';
  tabs = [
    { displayName: 'Courses', route: 'course/courses' },
    { displayName: 'Enrolled Courses', route: 'course/enrolled-courses' },
  ];
  activeLink = this.tabs[0].displayName;
}
