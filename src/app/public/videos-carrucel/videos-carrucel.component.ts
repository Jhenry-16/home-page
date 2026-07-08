import { CommonModule } from '@angular/common';
import {
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
export class VideosCarrucelComponent implements OnDestroy, OnInit {
  constructor(private cdRef: ChangeDetectorRef) {}
  currentIndex = 0;
  transitionEnabled = true;
  isTransitioning = false;

  isPaused = false;
  private autoplayInterval?: ReturnType<typeof setInterval>;

  selectedSocial = 'tiktok';

  videos = VideosCorto;

  get clonedVideos() {
    return [...this.videos, ...this.videos, ...this.videos];
  }

  get activeIndex(): number {
    const N = this.videos.length;
    if (N === 0) return 0;
    return ((this.currentIndex % N) + N) % N;
  }

  ngOnInit(): void {
    const N = this.videos.length;
    if (N > 0) {
      // Start in the middle segment to allow scrolling left and right immediately
      this.currentIndex = N;
    }
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
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

    this.currentIndex = this.currentIndex + diff;
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
      this.currentIndex = this.currentIndex - N;
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.transitionEnabled = true;
        this.cdRef.detectChanges();
      }, 50);
    } else if (this.currentIndex < N) {
      this.transitionEnabled = false;
      this.currentIndex = this.currentIndex + N;
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.transitionEnabled = true;
        this.cdRef.detectChanges();
      }, 50);
    }
  }

  getTrackTransform(): string {
    const N = this.videos.length;
    if (N === 0) return 'translateX(0)';
    return `translateX(calc(-1 * var(--half-card-width) - ${this.currentIndex} * var(--card-outer-width)))`;
  }

  abrirVideo(url: string) {
    window.open(url, '_blank');
  }
}
