import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';
import { HeaderComponent } from '../../core/layouts/public-layout/header/header.component';
import { RouterLink } from '@angular/router';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-main-carrucel',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './main-carrucel.component.html',
  styleUrl: './main-carrucel.component.scss',
})
export class MainCarrucelComponent implements OnInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly scrollService = inject(ScrollService);

  currentSlide = 0;
  private intervalId?: any;
  readonly interval = 7000;

  readonly slides = [
    {
      background: 'assets/images/fondos/fondo4.jpg',
      image: 'assets/images/fondos/fondo4.jpg',
      tag: 'Alcalde de Pueblo Libre, Gestión 2027-2030',
      title: 'José Luis Casas Carrión',
      description:
        'Trabajaremos por un distrito más seguro, moderno y con oportunidades para todos.',
      primaryButton: { boton: 'Conoce más', url: 'historia' },
      secondaryButton: { boton: 'Mis propuestas', url: 'propuestas' },
    },
    {
      background: 'assets/images/fondos/fondo1.jpg',
      image: 'assets/images/slider/candidato2.png',
      tag: 'Compromiso',
      title: 'Juntos construiremos el cambio',
      description:
        'Escucharemos a cada vecino para impulsar un verdadero desarrollo en nuestro distrito.',
      primaryButton: { boton: 'Ver historia', url: 'historia' },
      secondaryButton: { boton: 'Conversatorio', url: 'conversatorio' },
    },
    {
      background: 'assets/images/fondos/fondo3.jpg',
      image: 'assets/images/slider/candidato3.png',
      tag: 'Pueblo Libre',
      title: 'Más seguridad, más desarrollo',
      description: 'Nuestro compromiso es trabajar con transparencia y resultados para todos.',
      primaryButton: { boton: 'Ver propuestas', url: 'propuestas' },
      secondaryButton: { boton: 'Haz tu pregunta', url: 'preguntas' },
    },
  ];

  ngOnInit(): void {
    this.startSlider();
  }

  ngOnDestroy(): void {
    this.stopSlider();
  }

  startSlider(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.interval);
  }

  stopSlider(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.cdr.detectChanges();
    this.stopSlider();
    this.startSlider();
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.cdr.detectChanges();
    this.stopSlider();
    this.startSlider();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.cdr.detectChanges();
    this.stopSlider();
    this.startSlider();
  }

  abrirLink(url: string): void {
    this.scrollService.scrollTo(url);
  }
}
