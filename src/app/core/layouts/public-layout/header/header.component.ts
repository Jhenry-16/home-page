import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../../shared/components/material/material.module';
import { MenuHome } from '../../../models/menu-home.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @Output() menuClick = new EventEmitter<void>();

  isSticky = false;
  activarSeccion = 'inicio';
  private observer?: IntersectionObserver;

  readonly navMenu: ReadonlyArray<MenuHome> = [
    {
      nombre: 'Inicio',
      seccion: 'inicio',
    },
    {
      nombre: 'Historia',
      seccion: 'historia',
    },
    {
      nombre: 'Propuestas',
      seccion: 'propuestas',
    },
    {
      nombre: 'Haz tu pregunta',
      seccion: 'preguntas',
    },
    {
      nombre: 'Conversatorio',
      seccion: 'conversatorio',
    },
  ];

  ngAfterViewInit(): void {
    this.createObserver();
    this.updateActiveSection();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isSticky = window.scrollY > 60;
    this.updateActiveSection();
  }

  openMobileMenu(): void {
    this.menuClick.emit();
  }

  scrollTo(id: string): void {
    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    const headerHeight = this.isSticky ? 85 : 110;

    const top = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });

    this.activarSeccion = id;
  }

  private updateActiveSection(): void {
    const scrollPosition = window.scrollY + 140;

    for (const item of this.navMenu) {
      const section = document.getElementById(item.seccion);

      if (!section) {
        continue;
      }

      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < bottom) {
        this.activarSeccion = item.seccion;
        break;
      }
    }
  }

  private createObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activarSeccion = entry.target.id;
          }
        });
      },
      {
        root: null,
        rootMargin: '-90px 0px -55% 0px',
        threshold: 0,
      },
    );

    this.observeSections();
  }

  private observeSections(): void {
    this.navMenu.forEach((item) => {
      const section = document.getElementById(item.seccion);

      if (section) {
        this.observer?.observe(section);
      }
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
