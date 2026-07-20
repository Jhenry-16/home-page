import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetService {
  private readonly API =
    'https://script.google.com/macros/s/AKfycbxeRD9OiuyhbM6aeaBtZd_Jygu7_9hl3fF7Y3e47Bict58CJw6BicigPgsh33p7cN8/exec';

  constructor(private http: HttpClient) {}

  guardar(data: any) {
    const jsonBody = JSON.stringify(data);

    return this.http.post(this.API, jsonBody, {
      headers: { 'Content-Type': 'text/plain' }, // Evita activar restricciones estrictas de CORS
    });
  }
}
