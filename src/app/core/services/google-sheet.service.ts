import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetService {
  private readonly API =
    'https://script.google.com/macros/s/AKfycbyjbiF0w89Tn8GJaH58GmFAP3cP4fd6o4VJFkiHlLpbcenVQobj1uXftSFP-9vV7I3y/exec';

  constructor(private http: HttpClient) {}

  guardar(data: any) {
    const jsonBody = JSON.stringify(data);

    return this.http.post(this.API, jsonBody, {
      headers: { 'Content-Type': 'text/plain' }, // Evita activar restricciones estrictas de CORS
    });
  }
}
