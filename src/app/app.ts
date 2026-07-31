import { CommonModule } from '@angular/common';
import { Component, Inject, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { PreloaderComponent } from './shared/components/preloader/preloader.component';
import { PreloaderService } from './core/services/preloader.service';
import { GoogleSheetService } from './core/services/google-sheet.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatButtonModule, RouterOutlet, PreloaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('HomePage');
  private readonly googleSheet = inject(GoogleSheetService);
  private preloader = inject(PreloaderService);

  ngOnInit() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.preloader.hide();
      }, 1200);
    });
    this.googleSheet.incrementarContador().subscribe();
  }
}
