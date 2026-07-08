import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../shared/components/material/material.module';
import { MatDrawer } from '@angular/material/sidenav';
import { filter, take } from 'rxjs';
import { DrawerService } from '../../../services/drawer.service';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  @Output() close = new EventEmitter<void>();

  readonly navMenu = [
    { nombre: 'Inicio', seccion: 'inicio' },
    { nombre: 'Historia', seccion: 'historia' },
    { nombre: 'Propuestas', seccion: 'propuestas' },
    { nombre: 'Haz tu pregunta', seccion: 'preguntas' },
    { nombre: 'Conversatorio', seccion: 'conversatorio' },
  ];

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  closeMenu(): void {
    this.close.emit();
  }

  scrollTo(id: string): void {
    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    this.closeMenu();

    setTimeout(() => {
      const headerHeight = 90;

      window.scrollTo({
        top: section.getBoundingClientRect().top + window.pageYOffset - headerHeight,
        behavior: 'smooth',
      });
    }, 250);
  }
}
