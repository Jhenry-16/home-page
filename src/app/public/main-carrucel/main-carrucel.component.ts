import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';
import { AnimacionDirective } from '../../shared/directives/animacion.directive';

@Component({
  selector: 'app-main-carrucel',
  imports: [CommonModule, MaterialModule],
  templateUrl: './main-carrucel.component.html',
  styleUrl: './main-carrucel.component.scss',
})
export class MainCarrucelComponent implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}

  currentSlide = 0;
  private intervalId?: number;
  readonly interval = 7000;

  slides = [
    {
      background: 'assets/images/fondos/fondo4.jpg',
      image: 'assets/images/fondos/fondo4.jpg',
      tag: 'Candidato a la Alcaldía',
      title: 'José Luis Casas Carrión',
      description:
        'Trabajaremos por un distrito más seguro, moderno y con oportunidades para todos.',
      primaryButton: 'Conoce más',
      secondaryButton: 'Mis propuestas',
    },
    {
      background: 'assets/images/fondos/fondo1.jpg',
      image: 'assets/images/slider/candidato2.png',
      tag: 'Compromiso',
      title: 'Juntos construiremos el cambio',
      description:
        'Escucharemos a cada vecino para impulsar un verdadero desarrollo en nuestro distrito.',
      primaryButton: 'Ver historia',
      secondaryButton: 'Contáctanos',
    },
    {
      background: 'assets/images/fondos/fondo3.jpg',
      image: 'assets/images/slider/candidato3.png',
      tag: 'Pueblo Libre',
      title: 'Más seguridad, más desarrollo',
      description: 'Nuestro compromiso es trabajar con transparencia y resultados para todos.',
      primaryButton: 'Ver propuestas',
      secondaryButton: 'Haz tu pregunta',
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
    this.stopSlider();
    this.startSlider();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.stopSlider();
    this.startSlider();
  }
}
