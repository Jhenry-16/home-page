import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';
import { LocationData } from '../../core/data/location.data';
import { Location } from '../../core/models/location.model';

@Component({
  selector: 'app-conversatorio',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './conversatorio.component.html',
  styleUrl: './conversatorio.component.scss',
})
export class ConversatorioComponent implements OnInit, OnDestroy {
  recorridos: Location[] = LocationData;

  private map: any;
  private markers = new Map<number, any>();
  activeRecorrido?: Location;
  private apiKey = 'AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao';

  ngOnInit(): void {
    this.loadGoogleMaps().then(() => this.initMap());
  }

  ngOnDestroy(): void {
    this.markers.forEach((m) => {
      if (m && m.setMap) {
        m.setMap(null);
      }
    });
  }

  private loadGoogleMaps(): Promise<void> {
    return new Promise((resolve) => {
      const win = window as any;
      if (win.google && win.google.maps) {
        return resolve();
      }
      const scriptId = 'google-maps-script';
      if (document.getElementById(scriptId)) {
        (document.getElementById(scriptId) as HTMLScriptElement).addEventListener('load', () =>
          resolve(),
        );
        return;
      }
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  private initMap() {
    const center = { lat: -12.0735, lng: -77.067 };
    this.map = new (window as any).google.maps.Map(
      document.getElementById('conversatorio-map') as HTMLElement,
      {
        center,
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      },
    );

    // close card when clicking on map
    this.map.addListener('click', () => this.closeCard());

    this.createMarkers();
  }

  private createMarkers() {
    this.recorridos.forEach((r) => {
      const marker = new (window as any).google.maps.Marker({
        position: { lat: r.lat, lng: r.lng },
        map: this.map,
        icon: this.iconUrl('blue'),
        title: r.titulo,
      });
      marker.addListener('click', () => this.onMarkerClick(r.id));
      this.markers.set(r.id, marker);
    });
  }

  private onMarkerClick(id: number) {
    const found = this.recorridos.find((r) => r.id === id);
    if (!found) return;
    // reset previous
    if (this.activeRecorrido && this.activeRecorrido.id !== id) {
      const prevMarker = this.markers.get(this.activeRecorrido.id);
      if (prevMarker) prevMarker.setIcon(this.iconUrl('blue'));
    }
    const marker = this.markers.get(id);
    if (marker) {
      marker.setIcon(this.iconUrl('green'));
      this.map.panTo({ lat: found.lat, lng: found.lng });
    }
    this.activeRecorrido = found;
  }

  closeCard() {
    if (this.activeRecorrido) {
      const marker = this.markers.get(this.activeRecorrido.id);
      if (marker) marker.setIcon(this.iconUrl('blue'));
    }
    this.activeRecorrido = undefined;
  }

  private iconUrl(color: 'blue' | 'green') {
    const url =
      color === 'green'
        ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    return {
      url,
      scaledSize: new (window as any).google.maps.Size(40, 40),
      anchor: new (window as any).google.maps.Point(20, 40),
    };
  }
}
