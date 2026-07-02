import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  effect,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { MaterialModule } from '../material/material.module';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit, OnDestroy {
  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}
  private map?: L.Map;
  selectedMarker: any;

  markers = [
    {
      title: 'Coversatorio con vecinos de Madgalena Vieja',
      fecha: '18 de agosto, 2026',
      foto: 'assets/images/fondos/fondo1.jpg',
      link: '#',
      lat: -12.076993652236,
      lng: -77.06241386101154,
    },

    {
      title: 'Coversatorio con vecinos de Santa Rosa',
      fecha: '14 de julio, 2026',
      foto: 'assets/images/fondos/fondo1.jpg',
      link: '#',
      lat: -12.07368,
      lng: -77.06789,
    },
  ];

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
    this.loadMarkers();
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
          this.selectedMarker = item;
          this.cdr.detectChanges();
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
