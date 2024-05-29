import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courseList: Course[] = [];
  filteredCourses: Course[]=[];
  filterValue : string='';


  constructor(private courseservice : CourseService){}

  //subscribe man kan prenumerera på förändringar om man har en observable - tar emot som data och sparar igen i userlist
  ngOnInit(){
    this.courseservice.getCourses().subscribe(data =>{
      this.courseList = data;
      this.filteredCourses = data;
    })
  }

  //filtrerar kurserna utifrån sökfras och returnerar en array med kurser som uppfyller sökfrasen
  applyFilter():void{
    this.filteredCourses = this.courseList.filter((course)=>{
      return(course.courseName.toLowerCase().includes(this.filterValue.toLocaleLowerCase())||course.courseCode.toLocaleLowerCase().includes(this.filterValue.toLocaleLowerCase())
    );
    });
  }




}
