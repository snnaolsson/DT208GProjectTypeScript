import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private localStorageKey = 'schedule';

  constructor() { }

//hämtar ramschemat från localstorage
getSchedule(): any[] {
    const schedule = localStorage.getItem(this.localStorageKey);
    return schedule ? JSON.parse(schedule) : [];

  }

    // Spara ramschemat till localStorage
    saveSchedule(schedule: any[]): void {
      localStorage.setItem(this.localStorageKey, JSON.stringify(schedule));
    }
 // Ta bort en kurs från ramschemat
 removeCourse(courseCode: string): void {
  let schedule = this.getSchedule();
  schedule = schedule.filter(course => course.courseCode !== courseCode);
  this.saveSchedule(schedule);
}

  // Rensa hela ramschemat
  clearSchedule(): void {
    localStorage.removeItem(this.localStorageKey);
  }


}
