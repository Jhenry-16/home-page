import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../../shared/components/material/material.module';
import { MenuHome } from '../../../models/menu-home.model';
import { ScrollService } from '../../../services/scroll.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  constructor() {
    this.scrollSub = this.scrollService.activeSection$.subscribe((id) => {
      this.activarSeccion = id;
      setTimeout(() => {
        this.cdr.detectChanges();
      });
    });
  }
  @Output() menuClick = new EventEmitter<void>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly scrollService = inject(ScrollService);

  isSticky = false;
  activarSeccion = 'inicio';

  private observer?: IntersectionObserver;
  private scrollSub?: Subscription;

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
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isSticky = window.scrollY > 60;
    this.scrollService.setSticky(this.isSticky);
  }

  openMobileMenu(): void {
    this.menuClick.emit();
  }

  scrollTo(id: string): void {
    this.scrollService.scrollTo(id);
  }

  private createObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.scrollService.setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-90px 0px -40% 0px',
        threshold: 0.3,
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
    this.scrollSub?.unsubscribe();
  }
}
