import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-no-autorizado',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './no-autorizado.component.html',
  styleUrl: './no-autorizado.component.scss',
})
export class NoAutorizadoComponent {
  constructor(private router: Router) {}

  volverLogin() {
    this.router.navigate(['/']);
  }
}
