import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../model/course';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  courseList: Course[] = [];

  constructor(private courseservice : CourseService){}

  ngOnInit(){
    this.courseservice.getCourses().subscribe(data=>{
      this.courseList = data;
    })
  }
}
