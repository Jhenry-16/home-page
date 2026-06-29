import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes_public: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
