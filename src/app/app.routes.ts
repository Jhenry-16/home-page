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
  {
    path: 'access-denied',
    loadComponent: () =>
      import('./shared/components/access-denied/access-denied.component').then(
        (c) => c.AccessDeniedComponent,
      ),
  },
  // ERROR 403
  {
    path: '403',

    loadComponent: () =>
      import('./shared/components/access-denied/access-denied.component').then(
        (c) => c.AccessDeniedComponent,
      ),
  },

  // ERROR 404
  {
    path: '404',

    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
  {
    path: '**',

    redirectTo: '404',
  },
];
