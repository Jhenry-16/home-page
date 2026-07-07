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
        'Creación de la Central Distrital C4 (Centro de Comando, Control, Comunicaciones y Cómputo).',
        `Aplicativo móvil "Alerta Pueblo Libre."`,
        'Patrullaje focalizado en zonas críticas.',
        'Botón de pánico para emergencias.',
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
      items: [
        'Gestión inteligente del tránsito.',
        'Rutas seguras para peatones.',
        'Evaluación e implementación progresiva de ciclovías.',
        'Eliminación de barreras arquitectónicas.',
        'Accesibilidad para personas con discapacidad y adultos mayores.',
        'Elaboración del nuevo PDU.',
        'Transparencia en licencias urbanas.',
      ],
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
      title: 'Educación',
      items: [
        'Centro Preuniversitario Municipal(presencial y virtual).',
        'Prioridad para jóvenes del distrito.',
        'Cursos técnicos.',
        'Certificación por competencias.',
        'Especialización laboral.',
      ],
    },
    {
      icon: 'elderly',
      title: 'Inclusión social y atención a poblaciones vulnerables',
      items: [
        'Orientación legal.',
        'Atención preventiva en salud.',
        'Actividades recreativas.',
        'Fortalecimiento de programas sociales.',
        'Actividades recreativas.',
        'Actividades deportivas.',
      ],
    },
    {
      icon: 'sports_soccer',
      title: 'Deporte',
      items: [
        'Mejoramiento de complejos deportivos.',
        'Ampliación de disciplinas deportivas.',
        'Escuelas deportivas municipales.',
        'Programas deportivos inclusivos para: Jóvenes, Adultos mayores y Personas con discapacidad',
      ],
    },
    {
      icon: 'restore_from_trash',
      title: 'Limpieza pública',
      items: [
        'Optimización de la recolección de residuos.',
        'Segregación en la fuente.',
        'Reciclaje.',
        'Educación ambiental.',
      ],
    },
  ];
}
