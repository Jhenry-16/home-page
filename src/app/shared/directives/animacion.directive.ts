import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[animacion]',
})
export class AnimacionDirective implements AfterViewInit, OnDestroy {
  @Input('animacion') animClass = '';

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    element.classList.add(this.animClass);

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('show');
        } else {
          element.classList.remove('show');
        }
      },
      {
        threshold: 0.2,
      },
    );
    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
