import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-boton-flotante',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './boton-flotante.component.html',
  styleUrl: './boton-flotante.component.scss',
})
export class BotonFlotanteComponent {
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    const iconPath = 'assets/images/iconos';

    this.iconRegistry.addSvgIcon(
      'compartir',
      this.sanitizer.bypassSecurityTrustResourceUrl(`${iconPath}/compartir.svg`),
    );
    this.iconRegistry.addSvgIcon(
      'facebook',
      this.sanitizer.bypassSecurityTrustResourceUrl(`${iconPath}/facebook.svg`),
    );
    this.iconRegistry.addSvgIcon(
      'instagram',
      this.sanitizer.bypassSecurityTrustResourceUrl(`${iconPath}/instagram.svg`),
    );
    this.iconRegistry.addSvgIcon(
      'tiktok',
      this.sanitizer.bypassSecurityTrustResourceUrl(`${iconPath}/tiktok.svg`),
    );
    this.iconRegistry.addSvgIcon(
      'whatsapp',
      this.sanitizer.bypassSecurityTrustResourceUrl(`${iconPath}/whatsapp.svg`),
    );
  }

  openWhatsApp(): void {
    const mensaje = encodeURIComponent('Hola, deseo más información.');
    window.open(`https://chat.whatsapp.com/GIiVnDNzcXLG59blFrT5ML?text=${mensaje}`, '_blank');
  }

  irARed(plataforma: 'facebook' | 'instagram' | 'tiktok' | 'whatsapp'): void {
    let url = '';

    switch (plataforma) {
      case 'facebook':
        url = 'https://facebook.com';
        break;
      case 'instagram':
        url = 'https://instagram.com';
        break;
      case 'tiktok':
        url = 'https://tiktok.com';
        break;
      case 'whatsapp':
        const mensaje = encodeURIComponent('Hola, deseo más información.');
        url = `https://wa.me{mensaje}`; // Cambia por tu número o link de grupo
        break;
    }

    if (url) {
      window.open(url, '_blank');
    }
  }
}
