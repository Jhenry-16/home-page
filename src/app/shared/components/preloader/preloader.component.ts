import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PreloaderService } from '../../../core/services/preloader.service';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss',
})
export class PreloaderComponent {
  preloader = inject(PreloaderService);
}
