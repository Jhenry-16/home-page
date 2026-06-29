import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, retry, tap, throwError } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoginRequest = req.url.includes('/login');
    const shouldRetry = !isLoginRequest && (req.method === 'GET' || req.method === 'POST');

    if (!isLoginRequest) {
      // console.log(`[HTTP] ${req.method} ${req.url} → retry=${environment.RETRY}`);
    }

    return next.handle(req).pipe(
      shouldRetry ? retry(environment.retry) : (source) => source,

      tap((event) => {
        if (event instanceof HttpResponse && event.body?.error) {
          console.warn(`[HTTP ERROR] ${req.url}: ${event.body.errorMessage}`);
          throw new Error(event.body.errorMessage || 'Error desconocido');
        } // }else{
        //     this.snackBar.open('SUCCESS','INFO', {duration:2000});
        // }
      }),
      catchError((err: HttpErrorResponse) => {
        // Manejo de errores con snackBar
        if (err.status === 400) {
          this.snackBar.open(err.error?.message || 'Error 400', 'Cerrar', { duration: 5000 });
        } else if (err.status === 401) {
          this.snackBar.open('Usuario no autorizado', 'Cerrar', { duration: 5000 });
          this.router.navigate(['/login']);
        } else if (err.status === 403) {
          this.snackBar.open(err.error?.message || 'Error 403', 'Cerrar', { duration: 5000 });
          this.router.navigate(['/403']);
        } else if (err.status === 404) {
          // this.snackBar.open(err.error?.message || "Recurso no encontrado", "Cerrar", { duration: 5000 });
        } else if (err.status === 409) {
          this.snackBar.open(err.error?.message || 'Conflicto', 'Cerrar', { duration: 5000 });
        } else if (err.status === 500) {
          this.snackBar.open(err.error?.message || 'Error interno del servidor', 'Cerrar', {
            duration: 5000,
          });
        } else {
          this.snackBar.open('Error desconocido', 'Cerrar', { duration: 5000 });
        }

        return throwError(() => err);
      }),
    );
  }
}
