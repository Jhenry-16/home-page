import { isPlatformBrowser } from '@angular/common';
import { Directive, DOCUMENT, ElementRef, HostListener, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

@Directive({
  selector: '[pintarTexto]',
  standalone: true
})
export class PintarTextoDirective implements OnInit {

   @Input() color = '#ff6a00';
  @Input() baseColor = '#333333';

  private letters: HTMLElement[] = [];
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return; 

    const native = this.el.nativeElement;
    const text = native.innerText;
    native.innerHTML = '';

    this.letters = text.split('').map((char: string) => {
      const span = this.document.createElement('span'); 
      span.innerText = char;
      span.style.color = this.baseColor;
      span.style.transition = 'color .15s linear';
      native.appendChild(span);
      return span;
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.isBrowser) return; 

    const rect = this.el.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const visible = Math.max(0, Math.min(1, 1 - rect.top / (windowHeight * 0.7)));

    const total = this.letters.length;
    const lettersToColor = Math.floor(visible * total);

    this.letters.forEach((l, i) => {
      l.style.color = i < lettersToColor ? this.color : this.baseColor;
    });
  }

}
