import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Galeria } from '../models/galeria.model';
import { Conversatorio } from '../models/Conversatorio.model';
import { VideosCorto } from '../models/videos-corto.model';
import { ImageModal } from '../models/Image-dialog.model';

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
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  obtenerGaleria(): Observable<Galeria[]> {
    return this.http.get<Galeria[]>(`${this.API}?action=galeria`);
  }

  obtenerConversatorio(): Observable<Conversatorio[]> {
    return this.http.get<Conversatorio[]>(`${this.API}?action=conversatorio`);
  }

  obtenerVideos(): Observable<VideosCorto[]> {
    return this.http.get<VideosCorto[]>(`${this.API}?action=videos_carrucel`);
  }

  incrementarContador() {
    return this.http.get(`${this.API}?action=contador`);
  }

  obtenerImagenModal(): Observable<ImageModal> {
    return this.http
      .get<ImageModal[]>(`${this.API}?action=image_modal`)
      .pipe(map((data) => data[0]));
  }
}
