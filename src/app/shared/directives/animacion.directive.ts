import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[animacion]',
})
export class AnimacionDirective implements AfterViewInit, OnDestroy {
  @Input('animacion')
  animClass = '';

  private observer?: IntersectionObserver;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;

    if (this.animClass) {
      element.classList.add(this.animClass);
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        element.classList.toggle('show', entry.isIntersecting);
      },
      {
        threshold: 0.2,
      },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
  }
}
