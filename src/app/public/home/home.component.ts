import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';
import { MainCarrucelComponent } from '../main-carrucel/main-carrucel.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HistoriaComponent } from '../historia/historia.component';
import { PreguntasComponent } from '../preguntas/preguntas.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MaterialModule,
    MainCarrucelComponent,
    HistoriaComponent,
    PreguntasComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  mostrarVideo = false;
  videoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  verVideo() {
    this.mostrarVideo = true;

    const rawUrl = `https://drive.google.com/file/d/1GF9uTllgsgPq3twhPOdIB83RHrBxe-5C/preview`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }

  propuestas = [
    {
      icon: 'shield',
      title: 'Seguridad Ciudadana',
      items: ['Más serenazgo', 'Más cámaras', 'Tecnología e IA', 'Patrullaje integrado'],
    },
    {
      icon: 'account_balance',
      title: 'Orden y Fiscalización',
      items: ['Recuperar espacios públicos', 'Comercio ordenado', 'Fiscalización efectiva'],
    },
    {
      icon: 'park',
      title: 'Parques y Áreas Verdes',
      items: ['Más iluminación', 'Mantenimiento permanente', 'Más áreas verdes'],
    },
    {
      icon: 'directions_car',
      title: 'Tránsito y Movilidad',
      items: ['Soluciones inteligentes', 'Ordenamiento vial', 'Respeto al peatón'],
    },
    {
      icon: 'local_parking',
      title: 'Estacionamientos Inteligentes',
      items: ['Más espacios', 'Convenios', 'Zonas reguladas'],
    },
    {
      icon: 'pets',
      title: 'Bienestar Animal',
      items: ['Veterinaria Municipal', 'Campañas gratuitas', 'Adopción responsable'],
    },
    {
      icon: 'school',
      title: 'Educación y Capacitación',
      items: ['Casa del Vecino', 'Cursos gratuitos', 'Talleres para jóvenes'],
    },
    {
      icon: 'elderly',
      title: 'Adulto Mayor',
      items: ['Programas de salud', 'Actividades recreativas', 'Atención preferente'],
    },
    {
      icon: 'sports_soccer',
      title: 'Deporte y Vida Saludable',
      items: ['Más infraestructura', 'Escuelas deportivas', 'Actividades gratuitas'],
    },
    {
      icon: 'computer',
      title: 'Gobierno Digital',
      items: ['Trámites en línea', 'Respuesta rápida', 'Transparencia total'],
    },
  ];
}
