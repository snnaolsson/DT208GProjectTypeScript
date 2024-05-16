import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'courses', component: CoursesComponent},
    {path:'schedule', component: ScheduleComponent},
    {path:'', redirectTo: '/home', pathMatch: 'full'},
    {path:'404', component: NotFoundComponent},
    {path:'**', component: NotFoundComponent}
];
