import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';
import { AnimacionDirective } from '../../shared/directives/animacion.directive';
import { DialogService } from '../../core/services/dialog/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogcustomComponent } from '../../core/dialogcustom/dialogcustom.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validarInput, ValidationType } from '../../shared/utils/validaciones.util';
import { MatFormField } from '@angular/material/form-field';
import { Sector, Tipoapoyo } from '../../core/data/seleccion.data';
import { PreloaderComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { GoogleSheetService } from '../../core/services/google-sheet.service';
import { resetFormControls } from '../../shared/utils/reset-form.util';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatFormField, AnimacionDirective, PreloaderComponent],
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.scss',
})
export class PreguntasComponent {
  constructor(
    private sanitizer: DomSanitizer,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private formBuild: FormBuilder,
    private googleSheetService: GoogleSheetService,
  ) {
    this.buildForm();
    const rawUrl = `https://drive.google.com/file/d/1GF9uTllgsgPq3twhPOdIB83RHrBxe-5C/preview`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }
  private matDialogRef!: MatDialogRef<DialogcustomComponent>;
  videoUrl!: SafeResourceUrl;
  formPreguntas!: FormGroup;
  listaSector = Sector;
  listaTipoapoyo = Tipoapoyo;
  progressEnvio = false;

  buildForm() {
    this.formPreguntas = this.formBuild.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', [Validators.required, Validators.minLength(9)]],
      correo: ['', [Validators.required, Validators.email]],
      sector: ['', Validators.required],
      pregunta: [''],
      termino: [false, Validators.requiredTrue],
      tipoapoyo: ['', Validators.required],
    });
  }

  enviarPregunta() {
    if (this.formPreguntas.invalid) {
      this.formPreguntas.markAllAsTouched();
      return;
    }
    this.progressEnvio = true;

    this.googleSheetService.guardar(this.formPreguntas.value).subscribe({
      next: (res) => {
        this.limpiarFormulario();
        this.progressEnvio = false;
        this.toastrService.success(
          'Enviado correctamente, en breve nos comunicamos ¡Gracias por tu opinión!',
          'Exitoso',
          {
            timeOut: 3200,
            progressBar: true,
          },
        );
      },

      error: () => {
        this.progressEnvio = false;
        this.toastrService.error('No se pudo enviar, vuelva intentar');
      },
    });
  }

  abrirPdf() {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1neXLBmz72Ed_-XIhAAZkeomqm69obGBs/view';
    link.target = '_blank';
    link.download = 'Hoja_de_Vida_Jose_Casas_Carrion.pdf';
    link.click();
  }

  modalVerhistoria(template: TemplateRef<any>) {
    this.matDialogRef = this.dialogService.openDialogCustom({
      template,
    });
  }

  validarDatosinput(event: KeyboardEvent, tipo: ValidationType) {
    validarInput(event, tipo);
  }

  limpiarFormulario() {
    this.formPreguntas.reset();
  }

  abrirPDF() {
    const rutaPdf = 'assets/doc/Terminos_condiciones.pdf';
    window.open(rutaPdf, '_blank');
  }
}
