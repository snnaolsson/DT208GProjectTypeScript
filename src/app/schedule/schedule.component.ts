import { Component } from '@angular/core';
import { SchemaService } from '../services/schema.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  schedule: any[] = [];
  totalPoints: number = 0;
  constructor(private schemaservice : SchemaService){}

  ngOnInit(): void {
    this.loadSchedule();}

    loadSchedule(): void {
      this.schedule = this.schemaservice.getSchedule();
      this.calculateTotalPoints();
    }

    removeCourse(courseCode: string): void {
      this.schemaservice.removeCourse(courseCode);
      this.loadSchedule();
    }

    clearSchedule(): void {
      this.schemaservice.clearSchedule();
      this.loadSchedule();
    }

    updateSchedule():void{
      this.loadSchedule();
    }
    calculateTotalPoints(): void {
      this.totalPoints = this.schedule.reduce((acc, course) => acc + course.points, 0);
    }

}
