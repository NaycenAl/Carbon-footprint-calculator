import { Routes } from '@angular/router';
import { SummaryComponent } from './components/summary/summary.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
   {path : "", component: HomeComponent},
   {path: "/summary", component : SummaryComponent }
];
  