import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';
import { MainCarrucelComponent } from '../main-carrucel/main-carrucel.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HistoriaComponent } from '../historia/historia.component';
import { PreguntasComponent } from '../preguntas/preguntas.component';
import { ConversatorioComponent } from '../conversatorio/conversatorio.component';
import { VideosCarrucelComponent } from '../videos-carrucel/videos-carrucel.component';
import { AnimacionDirective } from '../../shared/directives/animacion.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MainCarrucelComponent,
    HistoriaComponent,
    PreguntasComponent,
    ConversatorioComponent,
    VideosCarrucelComponent,
    AnimacionDirective,
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
      items: [
        'Monitoreo inteligente las 24 horas.',
        `Aplicativo móvil "Alerta Pueblo Libre."`,
        'Patrullaje focalizado en zonas críticas.',
        'Iluminación LED blanca en vías y parques.',
      ],
    },
    {
      icon: 'account_balance',
      title: 'Empleo y Emprendimiento',
      items: [
        'Bolsa de trabajo municipal.',
        'Capacitación Laboral,',
        'Capacitación tributaria.',
        'Asesoría administrativa.',
        'Ordenamiento comercial.',
        'Recuperación del espacio público.',
      ],
    },
    {
      icon: 'park',
      title: 'Parques y Espacios Públicos para la Familia',
      items: [
        'Juegos infantiles modernos.',
        'Espacios para adultos mayores.',
        'Zonas deportivas familiares.',
        'Modernización del mobiliario urbano.',
        'Programación permanente de actividades deportivas y recreativas.',
      ],
    },
    {
      icon: 'directions_car',
      title: 'Tránsito y Movilidad',
      items: ['Soluciones inteligentes', 'Ordenamiento vial', 'Respeto al peatón'],
    },
    {
      icon: 'heart_broken',
      title: 'Salud Preventiva',
      items: [
        'Sistema Municipal de Salud Preventiva.',
        'Brigadas de rescate municipal.',
        'Campañas permanentes de prevención y control.',
        'Implementación de boticas municipales.',
      ],
    },
    {
      icon: 'pets',
      title: 'Bienestar Animal',
      items: [
        'Veterinaria municipal a costo social.',
        'Campañas de vacunación.',
        'Esterilización.',
        'Desparasitación.',
        'Registro de mascotas.',
        'Brigada Municipal de Protección Animal.',
        'Tachos especiales para mascotas.',
      ],
    },
    {
      icon: 'school',
      title: 'Educación y deporte',
      items: [
        'Centro Preuniversitario Municipal.',
        'Cursos técnicos.',
        'Certificación por competencias.',
        'Mejoramiento de complejos deportivos.',
        'Escuelas deportivas municipales.',
      ],
    },
    {
      icon: 'elderly',
      title: 'Inclusión Social y Atención a Poblaciones Vulnerables',
      items: [
        'Orientación legal.',
        'Atención preventiva en salud.',
        'Actividades recreativas.',
        'Fortalecimiento de programas sociales.',
      ],
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
