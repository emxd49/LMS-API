import { Component, Input } from '@angular/core';
import { ICourse, ILesson } from '../../data.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss',
})
export class CourseCardComponent {
  @Input() course!: ICourse;
  constructor(private courseService: CourseService) {}
  ngOnInit() {
    // @ts-ignore
    this.course.lessons = this.courseService.getLessons(this.course._id);
  }
  ngOnChanges() {
    // @ts-ignore
    this.course.lessons = this.courseService.getLessons(this.course._id);
  }
}
