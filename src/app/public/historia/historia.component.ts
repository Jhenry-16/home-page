import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';
import { AnimacionDirective } from '../../shared/directives/animacion.directive';
import { DialogService } from '../../core/services/dialog/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogcustomComponent } from '../../core/dialogcustom/dialogcustom.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-historia',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './historia.component.html',
  styleUrl: './historia.component.scss',
})
export class HistoriaComponent {
  constructor(
    private sanitizer: DomSanitizer,
    private dialogService: DialogService,
  ) {
    const rawUrl = `https://drive.google.com/file/d/1GF9uTllgsgPq3twhPOdIB83RHrBxe-5C/preview`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }

  private matDialogRef!: MatDialogRef<DialogcustomComponent>;
  videoUrl!: SafeResourceUrl;

  abrirPdf() {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/1H2XK3iYcZdRCPvRu-P4o6NJ7gO0mCEj-/view';
    link.target = '_blank';
    link.download = 'Hoja_de_Vida_Jose_Casas_Carrion.pdf';
    link.click();
  }

  modalVerhistoria(template: TemplateRef<any>) {
    this.matDialogRef = this.dialogService.openDialogCustom({
      template,
    });
  }
}
