import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/components/material/material.module';
import { FooterComponent } from '../../core/layouts/public-layout/footer/footer.component';
import { BotonFlotanteComponent } from '../../shared/components/boton-flotante/boton-flotante.component';
import { Router } from '@angular/router';
import { AnimacionDirective } from '../../shared/directives/animacion.directive';
import { Galeria } from '../../core/models/galeria.model';
import { GoogleSheetService } from '../../core/services/google-sheet.service';
import { PreloaderComponent } from '../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-lista-fotos',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FooterComponent,
    BotonFlotanteComponent,
    AnimacionDirective,
  ],
  templateUrl: './lista-fotos.component.html',
  styleUrl: './lista-fotos.component.scss',
})
export class ListaFotosComponent implements OnInit {
  constructor(private router: Router) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  private readonly googleSheetService = inject(GoogleSheetService);
  fotos: Galeria[] = [];

  fotosFiltradas: Galeria[] = [];
  searchKeyword: string = '';
  selectedCategory: string = 'Todas';
  categories: string[] = ['Todas', 'Conversatorios', 'Actividades', 'Vecinos'];

  showLightbox: boolean = false;
  activePhotoIndex: number = 0;
  cargando = true;

  ngOnInit(): void {
    this.cargando = true;
    this.googleSheetService.obtenerGaleria().subscribe({
      next: (data) => {
        this.fotos = data;
        this.applyFilters();
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar galería:', error);
        this.cargando = false;
      },
    });
    this.applyFilters();
  }

  irInicio() {
    this.router.navigate(['/']);
  }
  applyFilters(): void {
    this.fotosFiltradas = this.fotos.filter((foto) => {
      const matchesSearch =
        !this.searchKeyword ||
        foto.titulo.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        foto.descripcion.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        foto.lugar.toLowerCase().includes(this.searchKeyword.toLowerCase());

      const matchesCategory =
        this.selectedCategory === 'Todas' || foto.categoria === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Adjust active lightbox photo index if needed when filters change
    if (this.showLightbox) {
      if (this.fotosFiltradas.length === 0) {
        this.closeLightbox();
      } else if (this.activePhotoIndex >= this.fotosFiltradas.length) {
        this.activePhotoIndex = this.fotosFiltradas.length - 1;
      }
    }
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchKeyword = '';
    this.selectedCategory = 'Todas';
    this.applyFilters();
  }

  likePhoto(photoId: number, event: Event): void {
    event.stopPropagation(); // Avoid triggering card click (lightbox)
    const foto = this.fotos.find((f) => f.id === photoId);
    if (foto) {
      if (foto.liked) {
        foto.likes--;
        foto.liked = false;
      } else {
        foto.likes++;
        foto.liked = true;
      }
    }
  }

  sharePhoto(foto: Galeria, event: Event): void {
    event.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: foto.titulo,
          text: foto.descripcion,
          url: window.location.href,
        })
        .catch((err) => console.log('Error sharing:', err));
    } else {
      const textToCopy = `*${foto.titulo}*\n${foto.descripcion}\nUbicación: ${foto.lugar}\nFoto: ${foto.imagenUrl}`;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          alert('Detalles de la foto copiados al portapapeles para compartir.');
        })
        .catch((err) => {
          console.error('Error copying text:', err);
        });
    }
  }

  openLightbox(foto: Galeria): void {
    const idx = this.fotosFiltradas.findIndex((f) => f.id === foto.id);
    if (idx !== -1) {
      this.activePhotoIndex = idx;
      this.showLightbox = true;
    }
  }

  closeLightbox(): void {
    this.showLightbox = false;
  }

  prevPhoto(): void {
    if (this.fotosFiltradas.length <= 1) return;
    this.activePhotoIndex =
      (this.activePhotoIndex - 1 + this.fotosFiltradas.length) % this.fotosFiltradas.length;
  }

  nextPhoto(): void {
    if (this.fotosFiltradas.length <= 1) return;
    this.activePhotoIndex = (this.activePhotoIndex + 1) % this.fotosFiltradas.length;
  }

  get activePhoto(): Galeria {
    return this.fotosFiltradas[this.activePhotoIndex];
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.showLightbox) {
      if (event.key === 'Escape') {
        this.closeLightbox();
      } else if (event.key === 'ArrowRight') {
        this.nextPhoto();
      } else if (event.key === 'ArrowLeft') {
        this.prevPhoto();
      }
    }
  }
}
