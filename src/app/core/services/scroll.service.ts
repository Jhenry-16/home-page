import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private isSticky = false;
  private activeSectionSubject = new BehaviorSubject<string>('inicio');
  activeSection$ = this.activeSectionSubject.asObservable();

  setSticky(status: boolean): void {
    this.isSticky = status;
  }

  setActiveSection(id: string): void {
    this.activeSectionSubject.next(id);
  }
  scrollTo(id: string): void {
    const section = document.getElementById(id);
    if (!section) {
      console.warn(`La sección con id "${id}" no fue encontrada.`);
      return;
    }
    const headerHeight = this.isSticky ? 85 : 110;
    const top = section.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
    this.setActiveSection(id);
  }
}
