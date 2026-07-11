import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';
import { AnimacionDirective } from '../../shared/directives/animacion.directive';
import { VideosCorto } from '../../core/data/videos-corto.data';

export type Platform = 'all' | 'youtube' | 'facebook' | 'instagram' | 'tiktok';

@Component({
  selector: 'app-videos-carrucel',
  standalone: true,
  imports: [CommonModule, MaterialModule, AnimacionDirective],
  templateUrl: './videos-carrucel.component.html',
  styleUrl: './videos-carrucel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VideosCarrucelComponent implements OnDestroy, OnInit, AfterViewInit {
  constructor(private cdRef: ChangeDetectorRef) {}
  currentIndex = 0;
  transitionEnabled = true;
  isTransitioning = false;

  isPaused = false;
  private autoplayInterval?: ReturnType<typeof setInterval>;

  selectedSocial = 'tiktok';
  videos = VideosCorto;

  clonedVideos: typeof VideosCorto = [];

  ngOnInit(): void {
    this.clonedVideos = [...this.videos, ...this.videos, ...this.videos];

    const N = this.videos.length;

    if (N > 0) {
      setTimeout(() => {
        this.currentIndex = N;
        this.cdRef.detectChanges();
      });
    }
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.startAutoplay();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  get activeIndex(): number {
    const N = this.videos.length;
    if (N === 0) return 0;
    return ((this.currentIndex % N) + N) % N;
  }

  getTrackTransform(): string {
    return `translateX(calc(-1 * var(--half-card-width) - ${this.currentIndex} * var(--card-outer-width)))`;
  }

  private startAutoplay(): void {
    this.stopAutoplay();

    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide(false);
      }
    }, 3500);
  }

  private stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = undefined;
    }
  }

  pauseAutoplay(): void {
    this.isPaused = true;
  }

  resumeAutoplay(): void {
    this.isPaused = false;
  }

  nextSlide(restart = true): void {
    const N = this.videos.length;
    if (N <= 1 || this.isTransitioning) return;
    this.isTransitioning = true;
    this.transitionEnabled = true;
    this.currentIndex++;

    if (restart) {
      this.startAutoplay();
    }
  }

  prevSlide(): void {
    const N = this.videos.length;
    if (N <= 1 || this.isTransitioning) return;
    this.isTransitioning = true;
    this.transitionEnabled = true;
    this.currentIndex--;
    this.startAutoplay();
  }

  goToSlide(index: number): void {
    const N = this.videos.length;
    if (N <= 1 || this.isTransitioning) return;
    this.isTransitioning = true;
    this.transitionEnabled = true;
    const currentOrg = this.activeIndex;
    let diff = index - currentOrg;
    if (diff > N / 2) {
      diff -= N;
    } else if (diff < -N / 2) {
      diff += N;
    }
    this.currentIndex += diff;
    this.startAutoplay();
  }

  goToCard(idx: number): void {
    const N = this.videos.length;
    if (N <= 1 || this.isTransitioning) return;
    this.isTransitioning = true;
    this.transitionEnabled = true;
    this.currentIndex = idx;
    this.startAutoplay();
  }

  onTransitionEnd(): void {
    this.isTransitioning = false;
    const N = this.videos.length;
    if (N === 0) return;

    if (this.currentIndex >= 2 * N) {
      this.transitionEnabled = false;
      this.currentIndex -= N;

      setTimeout(() => {
        this.transitionEnabled = true;
      });
    } else if (this.currentIndex < N) {
      this.transitionEnabled = false;
      this.currentIndex += N;
      setTimeout(() => {
        this.transitionEnabled = true;
      });
    }
  }

  abrirVideo(url: string): void {
    window.open(url, '_blank');
  }
}
