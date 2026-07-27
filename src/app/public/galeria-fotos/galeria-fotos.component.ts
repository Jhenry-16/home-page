import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';
import { AnimacionDirective } from '../../shared/directives/animacion.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galeria-fotos',
  standalone: true,
  imports: [CommonModule, MaterialModule, AnimacionDirective],
  templateUrl: './galeria-fotos.component.html',
  styleUrl: './galeria-fotos.component.scss',
})
export class GaleriaFotosComponent {
  constructor(private readonly router: Router) {}
  irGaleria() {
    this.router.navigate(['/lista-fotos']);
  }
}
