import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';
import { AnimacionDirective } from '../../shared/directives/animacion.directive';

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
  // Index of the currently centered card in the cloned array
  currentIndex = 0;

  // Controls whether CSS transitions are enabled on the track
  transitionEnabled = true;

  // Tracks if a slide animation is currently running to prevent spamming
  isTransitioning = false;

  // Autoplay control
  isPaused = false;
  private autoplayInterval?: ReturnType<typeof setInterval>;

  selectedSocial = 'tiktok';

  videos = [
    {
      id: 1,
      social: 'tiktok',
      user: '@jose-casas',
      title: 'Conversatorio Pueblo Libre',
      image: 'assets/images/fondos/fondo1.jpg',
      likes: '12.5K',
      comments: 128,
    },
    {
      id: 2,
      social: 'instagram',
      user: '@jose-casas',
      title: 'Conversatorio con el sector 8',
      image: 'assets/images/fondos/fondo1.jpg',
      likes: '8.2K',
      comments: 96,
    },
    {
      id: 4,
      social: 'facebook',
      user: '@jose-casas',
      title: 'Conversatorio con el sector 3',
      image: 'assets/images/fondos/fondo4.jpg',
      likes: '4.3K',
      comments: 72,
    },
    {
      id: 5,
      social: 'tiktok',
      user: '@jose-casas',
      title: 'Conversatorio con el sector 2',
      image: 'assets/images/fondos/fondo2.jpg',
      likes: '15.7K',
      comments: 210,
    },
  ];

  // Tripled array to facilitate seamless infinite looping
  get clonedVideos() {
    return [...this.videos, ...this.videos, ...this.videos];
  }

  // Active index of the original videos array
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
      setTimeout(() => {
        this.transitionEnabled = true;
      }, 50);
    } else if (this.currentIndex < N) {
      this.transitionEnabled = false;
      this.currentIndex = this.currentIndex + N;
      setTimeout(() => {
        this.transitionEnabled = true;
      }, 50);
    }
  }

  getTrackTransform(): string {
    const N = this.videos.length;
    if (N === 0) return 'translateX(0)';
    return `translateX(calc(-1 * var(--half-card-width) - ${this.currentIndex} * var(--card-outer-width)))`;
  }
}
