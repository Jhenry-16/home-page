import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './scroll-top.component.html',
  styleUrl: './scroll-top.component.scss',
})
export class ScrollTopComponent {
  showButton = false;
  progress = 0;
  radius = 46;
  circumference = 2 * Math.PI * this.radius;
  dashOffset = this.circumference;

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.progress = (scrollTop / documentHeight) * 100;
    this.dashOffset = this.circumference - (this.progress / 100) * this.circumference;
    this.showButton = scrollTop > 250;
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
