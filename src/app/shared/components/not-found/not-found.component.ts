import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  volverHome() {
    this.router.navigate(['/home']);
  }
}
