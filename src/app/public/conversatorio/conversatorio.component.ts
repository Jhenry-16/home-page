import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/components/material/material.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from '../../shared/components/mapa/map.component';

@Component({
  selector: 'app-conversatorio',
  standalone: true,
  imports: [MaterialModule, GoogleMapsModule, MapComponent],
  templateUrl: './conversatorio.component.html',
  styleUrl: './conversatorio.component.scss',
})
export class ConversatorioComponent {}
