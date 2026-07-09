import { ChangeDetectorRef, Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { IconoSvgService } from '../../../core/services/icono-svg.service';

@Component({
  selector: 'app-boton-flotante',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './boton-flotante.component.html',
  styleUrl: './boton-flotante.component.scss',
})
export class BotonFlotanteComponent {
  private iconManager = inject(IconoSvgService);
  private cdRef = inject(ChangeDetectorRef);

  constructor() {
    const redes = ['compartir', 'facebook', 'instagram', 'tiktok', 'whatsapp'];
    this.iconManager.registerIcons(redes);
  }

  isButtonVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const previousVisibility = this.isButtonVisible;
    this.isButtonVisible = scrollPosition > 400;
    if (previousVisibility !== this.isButtonVisible) {
      this.cdRef.detectChanges();
    }
  }

  openWhatsApp(): void {
    const mensaje = encodeURIComponent('Hola, deseo más información.');
    window.open(`https://chat.whatsapp.com/GIiVnDNzcXLG59blFrT5ML?text=${mensaje}`, '_blank');
  }

  irARed(plataforma: 'facebook' | 'instagram' | 'tiktok' | 'whatsapp'): void {
    let url = '';

    switch (plataforma) {
      case 'facebook':
        url = 'https://www.facebook.com/JoseCasasOficial';
        break;
      case 'instagram':
        url = 'https://www.instagram.com/josecasascarrion/';
        break;
      case 'tiktok':
        url = 'https://www.tiktok.com/@josecasascarrion?_r=1&_t=ZS-97LhnDizHJy';
        break;
      case 'whatsapp':
        this.openWhatsApp();
        break;
    }

    if (url) {
      window.open(url, '_blank');
    }
  }
}
