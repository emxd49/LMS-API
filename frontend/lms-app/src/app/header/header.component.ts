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
  tabs = ['Courses', 'Enrolled Courses'];
  activeLink = this.tabs[0];
  displayTab(tab: string) {
    console.log(tab);
    this.activeLink = tab;
    if (tab == 'Courses') {
      this.router.navigate(['course/courses']);
    } else {
      this.router.navigate(['course/enrolled-courses']);
    }
  }
}
