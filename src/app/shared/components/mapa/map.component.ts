import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { MaterialModule } from '../material/material.module';
import * as L from 'leaflet';
import { RouterLink } from '@angular/router';
import { GoogleSheetService } from '../../../core/services/google-sheet.service';
import { Conversatorio } from '../../../core/models/Conversatorio.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit, OnDestroy {
  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  private readonly serviceConversatorio = inject(GoogleSheetService);
  private map?: L.Map;
  selectedMarker: any;

  markers: Conversatorio[] = [];

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }
  private initMap() {
    if (this.map) {
      return;
    }
    const container = L.DomUtil.get('map');

    if (container != null) {
      (container as any)._leaflet_id = null;
    }
    this.map = L.map('map', {
      zoomControl: true,
    }).setView([-12.076993652236, -77.06241386101154], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(this.map);
    this.cargarServicioDatos();
  }

  private cargarServicioDatos() {
    this.serviceConversatorio.obtenerConversatorio().subscribe({
      next: (data) => {
        this.markers = data.filter((item) => item && item.lat && item.lng);
        this.loadMarkers();
      },
      error: (error) => {
        console.error('Error al traer datos de Google Sheets:', error);
      },
    });
  }

  private loadMarkers(): void {
    if (!this.map) return;

    const inactiveIcon = L.icon({
      iconUrl: 'assets/images/iconos/location-inactive.png',
      iconSize: [64, 64],
      iconAnchor: [32, 64],
    });

    const activeIcon = L.icon({
      iconUrl: 'assets/images/iconos/location-active.png',
      iconSize: [64, 64],
      iconAnchor: [32, 64],
    });

    this.markers.forEach((item) => {
      const marker = L.marker([item.lat, item.lng], {
        icon: inactiveIcon,
      }).addTo(this.map!);

      marker.on('mouseover', () => {
        this.ngZone.run(() => {
          marker.setIcon(activeIcon);
          setTimeout(() => {
            this.selectedMarker = item;
            this.cdr.detectChanges();
          }, 0);
        });
      });

      marker.on('mouseout', () => {
        this.ngZone.run(() => {
          marker.setIcon(inactiveIcon);
          this.selectedMarker = null;
        });
      });
    });
  }
}
