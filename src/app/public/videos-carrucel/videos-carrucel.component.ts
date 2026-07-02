import { CommonModule } from '@angular/common';
import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';

export interface SocialVideo {
  id: number;
  platform: 'all' | 'youtube' | 'facebook' | 'instagram' | 'tiktok';
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  user: string;
  publishedAt: string;
  likes: number;
  comments: number;
  duration: string;
}

export type Platform = 'all' | 'youtube' | 'facebook' | 'instagram' | 'tiktok';

@Component({
  selector: 'app-videos-carrucel',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './videos-carrucel.component.html',
  styleUrl: './videos-carrucel.component.scss',
})
export class VideosCarrucelComponent implements OnInit, OnDestroy {
  readonly autoplayTime = 4000;

  private timer?: ReturnType<typeof setInterval>;

  readonly platforms: Platform[] = ['all', 'youtube', 'facebook', 'instagram', 'tiktok'];

  readonly selectedPlatform = signal<Platform>('all');

  readonly currentIndex = signal(0);

  readonly videos = signal<SocialVideo[]>([
    {
      id: 1,
      platform: 'youtube',
      title: 'Instalación de nuevas líneas eléctricas',
      description: 'Conoce nuestro trabajo de modernización.',
      thumbnail: 'assets/images/videos/video1.jpg',
      videoUrl: 'https://youtube.com',
      user: '@Electro',
      publishedAt: 'Hace 2 días',
      likes: 12500,
      comments: 180,
      duration: '1:28',
    },
    {
      id: 2,
      platform: 'facebook',
      title: 'Conversatorio con vecinos',
      description: 'Escuchamos a la comunidad.',
      thumbnail: 'assets/images/videos/video2.jpg',
      videoUrl: 'https://facebook.com',
      user: '@Electro',
      publishedAt: 'Hace 4 días',
      likes: 6200,
      comments: 70,
      duration: '0:58',
    },
    {
      id: 3,
      platform: 'instagram',
      title: 'Energía para todos',
      description: 'Seguimos creciendo.',
      thumbnail: 'assets/images/videos/video3.jpg',
      videoUrl: 'https://instagram.com',
      user: '@Electro',
      publishedAt: 'Hace 5 días',
      likes: 9400,
      comments: 96,
      duration: '1:14',
    },
    {
      id: 4,
      platform: 'tiktok',
      title: 'Mantenimiento preventivo',
      description: 'Nuestro equipo en acción.',
      thumbnail: 'assets/images/videos/video4.jpg',
      videoUrl: 'https://tiktok.com',
      user: '@Electro',
      publishedAt: 'Hace 1 semana',
      likes: 22100,
      comments: 420,
      duration: '0:42',
    },
    {
      id: 5,
      platform: 'youtube',
      title: 'Proyecto de electrificación',
      description: 'Más energía para más familias.',
      thumbnail: 'assets/images/videos/video5.jpg',
      videoUrl: 'https://youtube.com',
      user: '@Electro',
      publishedAt: 'Hace 8 días',
      likes: 18200,
      comments: 210,
      duration: '2:08',
    },
  ]);

  readonly filteredVideos = computed(() => {
    if (this.selectedPlatform() === 'all') {
      return this.videos();
    }

    return this.videos().filter((video) => video.platform === this.selectedPlatform());
  });

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    this.stopAutoplay();

    this.timer = setInterval(() => {
      this.next();
    }, this.autoplayTime);
  }

  stopAutoplay(): void {
    if (this.timer) {
      clearInterval(this.timer);

      this.timer = undefined;
    }
  }

  next(): void {
    const total = this.filteredVideos().length;

    if (total <= 1) return;

    this.currentIndex.update((value) => (value + 1) % total);
  }

  previous(): void {
    const total = this.filteredVideos().length;

    if (total <= 1) return;

    this.currentIndex.update((value) => (value - 1 + total) % total);
  }

  goTo(index: number): void {
    this.currentIndex.set(index);

    this.startAutoplay();
  }

  selectPlatform(platform: Platform): void {
    this.selectedPlatform.set(platform);

    this.currentIndex.set(0);

    this.startAutoplay();
  }

  openVideo(video: SocialVideo): void {
    window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
  }

  trackByVideo(index: number, video: SocialVideo): number {
    return video.id;
  }

  formatNumber(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    }

    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }

    return value.toString();
  }

  /**
   * Devuelve la posición relativa del video
   * 0 = centro
   * -1 = izquierda
   * 1 = derecha
   * -2 = izquierda lejana
   * 2 = derecha lejana
   */

  getOffset(index: number): number {
    const total = this.filteredVideos().length;

    let diff = index - this.currentIndex();

    if (diff > total / 2) {
      diff -= total;
    }

    if (diff < -total / 2) {
      diff += total;
    }

    return diff;
  }

  isVisible(index: number): boolean {
    return Math.abs(this.getOffset(index)) <= 2;
  }

  isSide(index: number): boolean {
    return Math.abs(this.getOffset(index)) === 1;
  }

  isFar(index: number): boolean {
    return Math.abs(this.getOffset(index)) === 2;
  }

  getTransform(index: number): string {
    const offset = this.getOffset(index);

    const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;

    // distances adapt to viewport width
    const small = vw < 768;
    const medium = vw >= 768 && vw < 992;

    const dist1 = small ? 120 : medium ? 200 : 260; // offset 1 distance
    const dist2 = small ? 220 : medium ? 380 : 470; // offset 2 distance

    switch (offset) {
      case 0:
        return `translateX(0) translateY(${small ? '-18px' : '-30px'}) scale(1)`;

      case -1:
        return `translateX(-${dist1}px) translateY(0) scale(.88)`;

      case 1:
        return `translateX(${dist1}px) translateY(0) scale(.88)`;

      case -2:
        return `translateX(-${dist2}px) translateY(0) scale(.75)`;

      case 2:
        return `translateX(${dist2}px) translateY(0) scale(.75)`;

      default:
        return 'scale(.6)';
    }
  }

  getOpacity(index: number): number {
    const offset = Math.abs(this.getOffset(index));

    if (offset === 0) return 1;

    if (offset === 1) return 0.8;

    if (offset === 2) return 0.45;

    return 0;
  }

  getZIndex(index: number): number {
    return 100 - Math.abs(this.getOffset(index));
  }
}
