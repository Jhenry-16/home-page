import { AfterViewInit, Component, effect } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map', {
      center: [-12.06, -77.05],
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data',
    }).addTo(this.map);
  }
}
