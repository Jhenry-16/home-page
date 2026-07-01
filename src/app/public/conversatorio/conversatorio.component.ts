import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-conversatorio',
  standalone: true,
  imports: [MaterialModule, GoogleMapsModule],
  templateUrl: './conversatorio.component.html',
  styleUrl: './conversatorio.component.scss',
})
export class ConversatorioComponent {
  // Centro inicial del mapa
  center: google.maps.LatLngLiteral = {
    lat: -12.076993652236,
    lng: -77.06241386101154,
  };

  zoom = 15;

  selectedMarker: any = null;

  // Ubicaciones
  markers = [
    {
      title: 'Municipalidad de Pueblo Libre',
      address: 'Av. General Manuel Vivanco 859',
      description: 'Sede principal de atención al ciudadano.',

      position: {
        lat: -12.076993652236,
        lng: -77.06241386101154,
      },
      icon: {
        url: 'assets/images/iconos/location-inactive.png',
        scaledSize: new google.maps.Size(64, 64),
      },

      hoverIcon: {
        url: 'assets/images/iconos/location-active.png',
        scaledSize: new google.maps.Size(64, 64),
      },
    },
    {
      title: 'Plaza Bolívar',
      address: 'Plaza Bolívar, Pueblo Libre',
      description: 'Espacio público para actividades culturales.',

      position: {
        lat: -12.07368,
        lng: -77.06789,
      },
      icon: {
        url: 'assets/images/iconos/location-inactive.png',
        scaledSize: new google.maps.Size(64, 64),
      },

      hoverIcon: {
        url: 'assets/images/iconos/location-active.png',
        scaledSize: new google.maps.Size(64, 64),
      },
    },

    {
      title: 'Museo Nacional de Arqueología',
      address: 'Plaza Bolívar, Pueblo Libre',
      description: 'Museo histórico y punto de interés turístico.',

      position: {
        lat: -12.074792,
        lng: -77.070517,
      },
      icon: {
        url: 'assets/images/iconos/location-inactive.png',
        scaledSize: new google.maps.Size(64, 64),
      },
      hoverIcon: {
        url: 'assets/images/iconos/location-active.png',
        scaledSize: new google.maps.Size(64, 64),
      },
    },
  ];

  hoverMarker(marker: any): void {
    this.selectedMarker = marker;
  }

  leaveMarker(): void {
    this.selectedMarker = null;
  }
}
