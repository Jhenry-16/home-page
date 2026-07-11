import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss',
})
export class AccessDeniedComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  volverLogin() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  volverHome() {
    this.router.navigate(['/']);
  }
}
