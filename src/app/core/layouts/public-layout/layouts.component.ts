import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../../../shared/components/material/material.module';
import { ScrollTopComponent } from '../../../shared/components/scroll-top/scroll-top.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    MaterialModule,
    ScrollTopComponent,
    MobileMenuComponent,
  ],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent {
  constructor() {}
  mobileMenuOpen = false;

  openMenu(): void {
    this.mobileMenuOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}
