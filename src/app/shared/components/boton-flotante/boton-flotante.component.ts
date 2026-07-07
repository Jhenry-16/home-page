import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-boton-flotante',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './boton-flotante.component.html',
  styleUrl: './boton-flotante.component.scss',
})
export class BotonFlotanteComponent {
  openWhatsApp(): void {
    const telefono = '906876795';
    const mensaje = encodeURIComponent('Hola, deseo más información.');
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
  }
}
