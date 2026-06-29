import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[animacion]',
})
export class AnimacionDirective implements AfterViewInit {
  @Input('animacion') animClass!: string;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const native = this.el.nativeElement;

    // Clase base de animación (oculta)
    native.classList.add(this.animClass);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            native.classList.add('show');
          } else {
            native.classList.remove('show');
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(native);
  }
}
