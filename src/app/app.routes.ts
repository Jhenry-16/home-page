import { Routes } from '@angular/router';
import { LayoutsComponent } from './core/layouts/public-layout/layouts.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: '',
        redirectTo: 'home', // redirige al home
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () => import('./public/public.routes').then((m) => m.routes_public),
      },
    ],
  },
];
