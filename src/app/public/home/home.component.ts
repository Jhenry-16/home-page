import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';
import { MainCarrucelComponent } from '../main-carrucel/main-carrucel.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HistoriaComponent } from '../historia/historia.component';
import { PreguntasComponent } from '../preguntas/preguntas.component';
import { ConversatorioComponent } from '../conversatorio/conversatorio.component';
import { VideosCarrucelComponent } from '../videos-carrucel/videos-carrucel.component';
import { AnimacionDirective } from '../../shared/directives/animacion.directive';
import { Propuestas } from '../../core/data/propuestas.data';
import { DialogService } from '../../core/services/dialog/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogcustomComponent } from '../../core/dialogcustom/dialogcustom.component';

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
export class HomeComponent implements AfterViewInit {
  constructor(
    private sanitizer: DomSanitizer,
    private dialogService: DialogService,
  ) {}

  @ViewChild('modalBienvenida') welcomeModal!: TemplateRef<any>;
  mostrarVideo = false;
  videoUrl!: SafeResourceUrl;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.abrirModal(this.welcomeModal);
    });
    // const opened = sessionStorage.getItem('WELCOME_MODAL');

    // if (opened) {
    //   return;
    // }

    // setTimeout(() => {
    //   this.abrirModal(this.welcomeModal);

    //   sessionStorage.setItem('WELCOME_MODAL', 'true');
    // });
  }

  verVideo() {
    this.mostrarVideo = true;

    const rawUrl = `https://drive.google.com/file/d/1GF9uTllgsgPq3twhPOdIB83RHrBxe-5C/preview`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }

  abrirModal(template: TemplateRef<any>) {
    return this.dialogService.openDialogCustom({
      template,
    });
  }

  propuestas = Propuestas;
}
