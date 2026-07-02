import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  loading = signal(true);

  show() {
    this.loading.set(true);
  }

  hide() {
    this.loading.set(false);
  }
}
