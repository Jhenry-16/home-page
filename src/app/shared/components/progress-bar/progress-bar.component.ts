import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PreloaderService } from '../../../core/services/preloader.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class PreloaderComponent {}
