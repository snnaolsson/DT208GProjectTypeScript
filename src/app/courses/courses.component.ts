import { Component, ViewChild, HostListener } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../toast/toast.component';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastComponent, ScheduleComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  @ViewChild(ToastComponent, {static: false}) toast!: ToastComponent;
  @ViewChild(ScheduleComponent, {static: false}) schedule!: ScheduleComponent;

  isSmallScreen: boolean = window.innerWidth < 1000;

  courseList: Course[] = [];
  filteredCourses: Course[] = [];
  filterValue: string="";
  subjectList: string[] = [];
  courseCounter: number = 0;

  //PAIGINATION - FUNKAR EJ I DAGSLÄGET
  currentPage: number = 1;
  itemsPerPage: number = 10; //Antal kurser per sida
  paginatedCourses: Course[] = []; // List for pagination

  constructor(private courseservice : CourseService){}

  //subscribe man kan prenumerera på förändringar om man har en observable - tar emot som data och sparar igen i userlist
  ngOnInit(){
    this.courseservice.getCourses().subscribe(data =>{
      this.courseList = data;
      this.filteredCourses = data;
      this.subjectList = this.createSubjectList(data);
      this.updateCourseCounter();

    })
  }
//Lyssnar efter om skärmstorleken förrändras och om bredden är under 1000px = issmallscreen sätts till true
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = event.target.innerWidth < 1000;
  }

  //filtrerar kurserna utifrån sökfras och returnerar en array med kurser som uppfyller sökfrasen
  applyFilter():void{
    this.filteredCourses = this.courseList.filter((course)=>{
      
      return(course.courseName.toLowerCase().includes(this.filterValue.toLowerCase())||course.courseCode.toLocaleLowerCase().includes(this.filterValue.toLowerCase()));

    });

    this.updateCourseCounter();

  }
  //metod med switchsats som kör olika metoder beroende på vilket option som är valt i selectlistan 
  onSelect(event: Event):void{
    let selectElement = event.target as HTMLSelectElement;
    let selectedValue = selectElement.value;
    
    switch(selectedValue){
      case 'code':
        this.sortCode();
        break;
       case 'name':
        this.sortName();
        break;
       case 'progressionDesc':
        this.sortProgDesc();
        break;
       case 'progressionAsc':
        this.sortProgAsc();
        break; 
       case 'hpAsc':
        this.sortHpDesc(); 
        break;
       case 'hpDesc':
        this.sortHpAsc();
        break;  
       case 'subject': 
       this.sortSub();
       break;
       default:
        this.sortSubject(selectedValue);
       break;    
    }
  }
//sorterar på kurskod
  sortCode():void{
    this.filteredCourses = [...this.filteredCourses].sort((a, b) => a.courseCode.localeCompare(b.courseCode));
    this.updateCourseCounter();

  }
  //sorterar på namn
  sortName():void{
    this.filteredCourses = [...this.filteredCourses].sort((a, b) => a.courseName.localeCompare(b.courseName));
    this.updateCourseCounter();

  }
  //sorterar på progression, descending
  sortProgDesc():void{
    this.filteredCourses = [...this.filteredCourses].sort((a, b) => b.progression.localeCompare(a.progression));
    this.updateCourseCounter();

  }
  //sortar på progression, ascending
  sortProgAsc():void{
    this.filteredCourses = [...this.filteredCourses].sort((a, b) => a.progression.localeCompare(b.progression));
    this.updateCourseCounter();

  }
  //sorterar på hp, ascending
  sortHpAsc():void{
    this.filteredCourses = [...this.filteredCourses].sort((a, b) => b.points - a.points);
    this.updateCourseCounter();

  }
  //sorterar på hp, descending
  sortHpDesc():void{
    this.filteredCourses = [...this.filteredCourses].sort((a, b) => a.points - b.points);
    this.updateCourseCounter();

  }
  //sorterar på ämne
  sortSub():void{
    this.filteredCourses = [...this.filteredCourses].sort((a, b) => a.subject.localeCompare(b.subject));
    this.updateCourseCounter();
  }


  //skapar en array med de ämnen som finns för att kunna använda som alternativ i select-listan
  createSubjectList(courses: Course[]):string[]{
    const subjects = courses.map(course=>course.subject);
    return Array.from(new Set(subjects));
  }

 
//filtrerar kurser utifrån valt ämne 
  sortSubject(subject:string):void{
    if (subject) {
      this.filteredCourses = this.courseList.filter(course => course.subject === subject);
     
    } else {
      this.filteredCourses = this.courseList;
    }
    this.updateCourseCounter();
  }

//uppdaterar kursräknaren
  updateCourseCounter(): void {
    this.courseCounter = this.filteredCourses.length;
  }


  //sparar kurser till localstorage, skriver ut meddelandet om att kurs är tillagd och uppdaterar ramschemat
  saveToSchedule(course: Course): void {
    let schedule = JSON.parse(localStorage.getItem('schedule') || '[]');
    if (!schedule.some((c: Course) => c.courseCode === course.courseCode)) {
      schedule.push(course);
      localStorage.setItem('schedule', JSON.stringify(schedule));
      this.schedule.updateSchedule();
      this.toast.showMessage(`${course.courseName} sparad till ramschema`);

      
    }
}

}

