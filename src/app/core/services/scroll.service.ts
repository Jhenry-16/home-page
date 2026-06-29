import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  /*altura$=> observable de altura */
  private altura$ = new BehaviorSubject<number>(0);
  scroll$ = this.altura$.asObservable();

  constructor(zone: NgZone) {
    zone.runOutsideAngular(() => {
      window.addEventListener('scroll', () => zone.run(() => this.altura$.next(window.scrollY)));
    });
  }

  observe(hl: HTMLElement, threshold = 0.2) {
    return new Promise<void>((res) => {
      const ob = new IntersectionObserver(
        (e) => {
          if (e[0].isIntersecting) {
            ob.disconnect();
            res();
          }
        },
        { threshold },
      );
      ob.observe(hl);
    });
  }
}
