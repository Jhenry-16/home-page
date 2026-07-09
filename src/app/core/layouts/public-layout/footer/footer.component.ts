import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../../../shared/components/material/material.module';
import { IconoSvgService } from '../../../services/icono-svg.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private iconManager = inject(IconoSvgService);
  constructor(private router: Router) {
    const redes = ['compartir', 'facebook', 'instagram', 'tiktok', 'whatsapp'];
    this.iconManager.registerIcons(redes);
  }
  anioActual = new Date().getFullYear();
  grupoWhatsapp() {
    window.open('https://whatsapp.com/channel/0029Vb7dNfbG8l5LCj6Mac1V', '_blank');
  }
}
